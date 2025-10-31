import { useState, type FormEvent } from 'react';
import { submitLead } from '../utils/lead';
const LeadForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // React 的合成事件在异步阶段会被回收，先保存表单引用
    const formEl = e.currentTarget as HTMLFormElement;
    const fd = new FormData(formEl);
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      message: String(fd.get('message') || ''),
      source: 'contact',
    };
    try {
      setLoading(true);
      await submitLead(payload);
      setMessage('Submitted successfully. We will contact you soon.');
      formEl.reset();
    } catch (err: unknown) {
      let msg = 'Submit failed, please try again later.';
      if (err instanceof Error) msg = err.message;
      else if (typeof err === 'string') msg = err;
      setMessage(String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="fade-up bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Leave your information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" placeholder="Name" required className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        <input name="email" type="email" placeholder="Email" required className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        <input name="phone" placeholder="Phone (optional)" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 md:col-span-2" />
        <textarea name="message" placeholder="Message" required className="w-full h-28 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 md:col-span-2" />
      </div>
      <button type="submit" disabled={loading} className="mt-4 w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </form>
  );
};

export default LeadForm;


