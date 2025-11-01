import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import crypto from 'node:crypto';

const ses = new SESClient({});
const ddb = new DynamoDBClient({});

const from = process.env.SES_FROM;
const to = (process.env.SES_TO || '').split(',').map(s => s.trim()).filter(Boolean);
const table = process.env.DDB_TABLE; // optional

const ok = (data) => ({ statusCode: 200, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ok: true, data }) });
const bad = (code, msg) => ({ statusCode: code, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ok: false, error: msg }) });

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod;
  if (method === 'OPTIONS') return { statusCode: 204, body: '' };
  if (method !== 'POST') return bad(405, 'method_not_allowed');

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return bad(400, 'invalid_json'); }

  const { name, email, phone = '', message, source = 'web' } = body;
  if (!name || !email || !message) return bad(422, 'missing_required_fields');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return bad(422, 'invalid_email');

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const clientIp = event.requestContext?.http?.sourceIp || event.requestContext?.identity?.sourceIp || '';
  const ua = event.headers?.['user-agent'] || '';

  if (table) {
    await ddb.send(new PutItemCommand({
      TableName: table,
      Item: {
        id: { S: id },
        createdAt: { S: now },
        name: { S: String(name).slice(0, 200) },
        email: { S: String(email).slice(0, 200) },
        phone: { S: String(phone).slice(0, 64) },
        message: { S: String(message).slice(0, 4000) },
        source: { S: String(source) },
        clientIp: { S: clientIp },
        userAgent: { S: ua },
      },
    }));
  }

  // 发送管理员通知邮件
  if (from && to.length) {
    const adminSubject = `新线索：${name} - ${source}`;
    const adminHtml = `
      <div>
        <h3>新用户提交</h3>
        <p><b>时间：</b>${now}</p>
        <p><b>姓名：</b>${name}</p>
        <p><b>邮箱：</b>${email}</p>
        <p><b>电话：</b>${phone}</p>
        <p><b>来源：</b>${source}</p>
        <p><b>IP：</b>${clientIp}</p>
        <p><b>UA：</b>${ua}</p>
        <p><b>留言：</b></p>
        <pre style="white-space:pre-wrap">${String(message).slice(0, 4000)}</pre>
      </div>
    `;
    await ses.send(new SendEmailCommand({
      Destination: { ToAddresses: to },
      Message: { Subject: { Data: adminSubject, Charset: 'UTF-8' }, Body: { Html: { Data: adminHtml, Charset: 'UTF-8' } } },
      Source: from,
    }));
  }

  // 发送用户确认邮件
  if (from) {
    try {
      const userSubject = 'Thank You for Your Inquiry - IT Gift Card';
      const userHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #14b8a6;">IT Gift Card Trading Platform</h2>
          </div>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1f2937;">Dear ${name},</h3>
            <p style="color: #4b5563; line-height: 1.6;">
              Thank you for contacting us! We have successfully received your inquiry and will get back to you as soon as possible.
            </p>
            <p style="color: #4b5563; line-height: 1.6;">
              Your message:
            </p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #14b8a6; margin: 15px 0;">
              <p style="color: #374151; margin: 0; white-space: pre-wrap;">${String(message).slice(0, 4000)}</p>
            </div>
            <p style="color: #4b5563; line-height: 1.6;">
              Our team typically responds within 24 hours. You can also reach us directly through the following channels:
            </p>
            <div style="margin: 20px 0; padding: 15px; background-color: white; border-radius: 6px;">
              <p style="color: #1f2937; font-weight: 600; margin: 0 0 12px 0;">Contact Us:</p>
              <div style="margin-bottom: 10px;">
                <span style="color: #25D366; font-weight: 600;">WhatsApp:</span>
                <a href="https://wa.me/8615337211812" style="color: #14b8a6; text-decoration: none; margin-left: 8px;">+86 153 3721 1812</a>
                <span style="color: #6b7280; margin: 0 8px;">or</span>
                <a href="https://wa.me/8615337211812" style="color: #14b8a6; text-decoration: none;">+86 153 3721 1812</a>
              </div>
              <div style="margin-bottom: 10px;">
                <span style="color: #0088cc; font-weight: 600;">Telegram:</span>
                <a href="https://t.me/IT_gift_card" style="color: #14b8a6; text-decoration: none; margin-left: 8px;">@IT_gift_card</a>
              </div>
              <div>
                <span style="color: #000000; font-weight: 600;">TikTok:</span>
                <a href="https://www.tiktok.com/@miss.rich77" style="color: #14b8a6; text-decoration: none; margin-left: 8px;">@miss.rich77</a>
              </div>
            </div>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Best regards,<br>
              IT Gift Card Team
            </p>
          </div>
        </div>
      `;
      await ses.send(new SendEmailCommand({
        Destination: { ToAddresses: [email] },
        Message: { 
          Subject: { Data: userSubject, Charset: 'UTF-8' }, 
          Body: { Html: { Data: userHtml, Charset: 'UTF-8' } } 
        },
        Source: from,
      }));
    } catch (userEmailError) {
      // 用户邮件发送失败不影响整体流程，只记录错误
      console.error('Failed to send user confirmation email:', userEmailError);
    }
  }

  return ok({ id, createdAt: now });
};


