import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackConversion, trackEvent, trackPageView, trackPageConversion } from './utils/gtag';
import { generateEventId, getFacebookClickId, trackPixel, sendToCapi } from './utils/fb';
import { trackLinkClick } from './utils/tracker';
import './App.css';

// Import pages
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FAQFooter from './components/FAQFooter';
import ChatWidget from './components/ChatWidget';
import { initTracker } from './utils/tracker';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger);

// Initialize tracker
if (typeof window !== 'undefined') {
  initTracker();
}

// WhatsApp处理函数
const handleWhatsAppClick = (message: string = 'Hello! I would like to get a quote for my gift card.', ctaId: string = 'whatsapp-main') => {
  const phoneNumber = '8615337211812';
  
  // Track AF link click
  trackLinkClick(ctaId);
  
  // 跟踪转化事件
  trackConversion();
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'whatsapp_contact',
    value: 1
  });
  // Facebook Pixel + CAPI（可选）
  const eventId = generateEventId();
  const { fbp, fbc } = getFacebookClickId();
  trackPixel('Lead', { value: 1, currency: 'CNY' }, eventId);
  sendToCapi({
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: 'website',
    event_source_url: window.location.href,
    fbp,
    fbc,
    custom_data: { value: 1, currency: 'CNY' }
  });
  
  // 使用更可靠的WhatsApp API格式
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  console.log('WhatsApp URL:', whatsappUrl);
  
  try {
    const newWindow = window.open(whatsappUrl, '_blank');
    if (!newWindow) {
      alert('请允许弹窗以打开WhatsApp');
    }
  } catch (error) {
    console.error('WhatsApp链接错误:', error);
    alert('无法打开WhatsApp，请检查网络连接');
  }
  };

// 团队成员WhatsApp处理函数
const handleTeamWhatsAppClick = (phoneNumber: string, memberName: string) => {
  const message = `Hello ${memberName}! I would like to get a quote for my gift card.`;
  
  // Track AF link click
  trackLinkClick(`whatsapp-team-${memberName.toLowerCase()}`);
  
  // 跟踪转化事件
  trackConversion();
  trackEvent('team_whatsapp_click', {
    event_category: 'engagement',
    event_label: `team_contact_${memberName}`,
    value: 1
  });
  // Facebook Pixel + CAPI（可选）
  const eventId = generateEventId();
  const { fbp, fbc } = getFacebookClickId();
  trackPixel('Lead', { value: 1, currency: 'CNY' }, eventId);
  sendToCapi({
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: 'website',
    event_source_url: window.location.href,
    fbp,
    fbc,
    custom_data: { value: 1, currency: 'CNY', team_member: memberName }
  });
  
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  
  try {
    const newWindow = window.open(whatsappUrl, '_blank');
    if (!newWindow) {
      alert('请允许弹窗以打开WhatsApp');
    }
  } catch (error) {
    console.error('WhatsApp链接错误:', error);
    alert('无法打开WhatsApp，请检查网络连接');
  }
};

// Telegram处理函数
const handleTelegramClick = (username: string, ctaId: string = 'telegram-main') => {
  const telegramUrl = `https://t.me/${username}`;
  
  // Track AF link click
  trackLinkClick(ctaId);
  
  // 跟踪转化事件
  trackConversion();
  trackEvent('telegram_click', {
    event_category: 'engagement',
    event_label: `telegram_contact_${username}`,
    value: 1
  });
  // Facebook Pixel + CAPI（可选）
  const eventId = generateEventId();
  const { fbp, fbc } = getFacebookClickId();
  trackPixel('Lead', { value: 1, currency: 'CNY' }, eventId);
  sendToCapi({
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: 'website',
    event_source_url: window.location.href,
    fbp,
    fbc,
    custom_data: { value: 1, currency: 'CNY', channel: 'telegram', username }
  });
  
  try {
    const newWindow = window.open(telegramUrl, '_blank');
    if (!newWindow) {
      alert('请允许弹窗以打开Telegram');
    }
  } catch (error) {
    console.error('Telegram链接错误:', error);
    alert('无法打开Telegram，请检查网络连接');
  }
};

// TikTok处理函数
const handleTikTokClick = (username: string, ctaId: string = 'tiktok-main') => {
  const tiktokUrl = `https://www.tiktok.com/@${username}`;
  
  // Track AF link click
  trackLinkClick(ctaId);
  
  // 跟踪转化事件
  trackConversion();
  trackEvent('tiktok_click', {
    event_category: 'engagement',
    event_label: `tiktok_contact_${username}`,
    value: 1
  });
  // Facebook Pixel + CAPI（可选）
  const eventId = generateEventId();
  const { fbp, fbc } = getFacebookClickId();
  trackPixel('Lead', { value: 1, currency: 'CNY' }, eventId);
  sendToCapi({
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: 'website',
    event_source_url: window.location.href,
    fbp,
    fbc,
    custom_data: { value: 1, currency: 'CNY', channel: 'tiktok', username }
  });
  
  try {
    const newWindow = window.open(tiktokUrl, '_blank');
    if (!newWindow) {
      alert('请允许弹窗以打开TikTok');
    }
  } catch (error) {
    console.error('TikTok链接错误:', error);
    alert('无法打开TikTok，请检查网络连接');
  }
};


// Navigation Component
const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/images/logo.png" 
              alt="Rich Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-teal-600">IT</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-teal-600' 
                  : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/about' 
                  ? 'text-teal-600' 
                  : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/services" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/services' 
                  ? 'text-teal-600' 
                  : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/contact' 
                  ? 'text-teal-600' 
                  : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Social Media Buttons */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleWhatsAppClick('Hello! I would like to get a quote for my gift card.', 'whatsapp-nav')}
              data-track="jump"
              data-id="whatsapp-nav"
              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            
            <button 
              onClick={() => handleTelegramClick('IT_gift_card', 'telegram-nav')}
              data-track="jump"
              data-id="telegram-nav"
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="hidden sm:inline">Telegram</span>
            </button>
            
            <button 
              onClick={() => handleTikTokClick('miss.rich77', 'tiktok-nav')}
              data-track="jump"
              data-id="tiktok-nav"
              className="bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <span className="hidden sm:inline">TikTok</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// HomePage Component
const HomePage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 基础滚动动画 - 简化版本
      gsap.utils.toArray('.fade-up').forEach((element) => {
        gsap.fromTo(element as gsap.TweenTarget, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element as gsap.DOMTarget,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 数字计数动画 - 简化版本
      gsap.utils.toArray('.count-up').forEach((element) => {
        const endValue = parseInt((element as HTMLElement).textContent || '0');
        gsap.fromTo(element as gsap.TweenTarget, 
          { textContent: 0 },
          {
            textContent: endValue,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: element as gsap.DOMTarget,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, mainRef);

    // Auto-play testimonials carousel
    const carousel = document.getElementById('testimonials-carousel');
    let currentIndex = 0;
    const totalTestimonials = 15;

    const autoPlay = () => {
      if (carousel) {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    };

    // Auto-play transaction images carousel
    const transactionCarousel = document.getElementById('transaction-images-carousel');
    let transactionIndex = 0;
    const totalTransactions = 15;

    const autoPlayTransactions = () => {
      if (transactionCarousel) {
        transactionIndex = (transactionIndex + 1) % totalTransactions;
        transactionCarousel.style.transform = `translateX(-${transactionIndex * 100}%)`;
      }
    };

    const interval = setInterval(autoPlay, 4000); // 4 seconds
    const transactionInterval = setInterval(autoPlayTransactions, 3000); // 3 seconds

    return () => {
      ctx.revert();
      clearInterval(interval);
      clearInterval(transactionInterval);
    };
  }, []);


  return (
    <div ref={mainRef} className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 bg-gradient-to-br from-teal-50 via-green-50 to-blue-50 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full opacity-20 float"></div>
            <div className="absolute top-20 -left-20 w-60 h-60 bg-green-200 rounded-full opacity-20 float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 float" style={{animationDelay: '2s'}}></div>
          </div>

          {/* Floating Brand Logos */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Foot Locker Logo */}
            <div className="floating-logo float-random-1" style={{top: '20%', left: '15%'}}>
              <img src="/images/fl.png" alt="Foot Locker" />
            </div>
            
            {/* RAZER GOLD Logo */}
            <div className="floating-logo float-random-2" style={{top: '30%', right: '20%'}}>
              <img src="/images/go.png" alt="RAZER GOLD" />
            </div>
            
            {/* iTunes Logo */}
            <div className="floating-logo float-random-3" style={{bottom: '25%', left: '25%'}}>
              <img src="/images/it.png" alt="iTunes" />
            </div>
            
            {/* Steam Logo */}
            <div className="floating-logo float-random-4" style={{bottom: '35%', right: '15%'}}>
              <img src="/images/st.png" alt="Steam" />
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="fade-up mb-8">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <img 
                    src="/images/logo.png" 
                    alt="Rich Logo" 
                    className="w-16 h-16 object-contain"
                  />
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
                    Welcome to <span className="text-teal-600">IT</span>
                  </h1>
                </div>
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  The largest gift card trading platform in Wuhan. Trade your gift cards for cash at the best rates with lightning-fast processing.
                </p>
              </div>

              <div className="fade-up flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <button 
                  onClick={() => handleWhatsAppClick('Hello! I would like to start trading my gift cards.', 'whatsapp-hero')}
                  data-track="jump"
                  data-id="whatsapp-hero"
                  className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Start Trading Now
                </button>
                <Link 
                  to="/about"
                  className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-600 hover:text-white transition-colors inline-block text-center"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="fade-up grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-teal-600 count-up">10000</div>
                  <div className="text-gray-600 mt-2">Satisfied Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 count-up">50000</div>
                  <div className="text-gray-600 mt-2">Cards Traded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 count-up">5</div>
                  <div className="text-gray-600 mt-2">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 count-up">99</div>
                  <div className="text-gray-600 mt-2">% Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Gift Cards Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 fade-up">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Supported Gift Cards</h3>
              <p className="text-lg text-gray-600">Trade your gift cards from these popular brands</p>
            </div>
            
            {/* 自动轮播的礼品卡 */}
            <div className="relative overflow-hidden fade-up">
              <div className="flex animate-scroll" id="gift-cards-carousel" style={{width: '200%'}}>
                {/* 第一组礼品卡 */}
                <div className="flex items-center justify-center space-x-12 md:space-x-16 flex-shrink-0">
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex items-center justify-center shadow-xl p-6 md:p-8">
                      <img 
                        src="/images/fl.png" 
                        alt="Foot Locker" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xl text-gray-600 font-semibold">Foot Locker</span>
                  </div>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex items-center justify-center shadow-xl p-6 md:p-8">
                      <img 
                        src="/images/go.png" 
                        alt="RAZER GOLD" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xl text-gray-600 font-semibold">RAZER GOLD</span>
                  </div>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex items-center justify-center shadow-xl p-6 md:p-8">
                      <img 
                        src="/images/it.png" 
                        alt="iTunes" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xl text-gray-600 font-semibold">iTunes</span>
                  </div>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex items-center justify-center shadow-xl p-6 md:p-8">
                      <img 
                        src="/images/st.png" 
                        alt="Steam" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xl text-gray-600 font-semibold">Steam</span>
                  </div>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex items-center justify-center shadow-xl p-6 md:p-8">
                      <img 
                        src="/images/xb.png" 
                        alt="Xbox" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xl text-gray-600 font-semibold">Xbox</span>
                  </div>
                </div>
                
                {/* 间距 */}
                <div className="w-24 flex-shrink-0"></div>
                
                {/* 第二组礼品卡（重复，用于无缝滚动） */}
                <div className="flex items-center justify-center space-x-12 md:space-x-16 flex-shrink-0">
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex items-center justify-center shadow-xl p-6 md:p-8">
                      <img 
                        src="/images/fl.png" 
                        alt="Foot Locker" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xl text-gray-600 font-semibold">Foot Locker</span>
                  </div>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex items-center justify-center shadow-xl p-6 md:p-8">
                      <img 
                        src="/images/go.png" 
                        alt="RAZER GOLD" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xl text-gray-600 font-semibold">RAZER GOLD</span>
                  </div>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex items-center justify-center shadow-xl p-6 md:p-8">
                      <img 
                        src="/images/it.png" 
                        alt="iTunes" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xl text-gray-600 font-semibold">iTunes</span>
                  </div>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex items-center justify-center shadow-xl p-6 md:p-8">
                      <img 
                        src="/images/st.png" 
                        alt="Steam" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xl text-gray-600 font-semibold">Steam</span>
                  </div>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex items-center justify-center shadow-xl p-6 md:p-8">
                      <img 
                        src="/images/xb.png" 
                        alt="Xbox" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xl text-gray-600 font-semibold">Xbox</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Rates Cards Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* 左侧 - 最佳汇率卡片展示 */}
              <div className="fade-up">
                <div className="bg-gradient-to-br from-teal-500 to-orange-500 rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-6">Best Rates Cards</h2>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {/* Apple Gift Card */}
                    <div className="bg-white/20 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center p-2">
                        <img 
                          src="/images/it.png" 
                          alt="Apple Gift Card" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-sm font-semibold">Apple Gift Card</div>
                    </div>
                    
                    {/* Foot Locker */}
                    <div className="bg-white/20 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center p-2">
                        <img 
                          src="/images/fl.png" 
                          alt="Foot Locker" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-sm font-semibold">Foot Locker</div>
                    </div>
                    
                    {/* Steam */}
                    <div className="bg-white/20 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center p-2">
                        <img 
                          src="/images/st.png" 
                          alt="Steam" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-sm font-semibold">STEAM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="text-2xl font-bold">3.2%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧 - 内容 */}
              <div className="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Get the <span className="text-teal-600">Best Rates</span> in the Market
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our advanced pricing algorithm ensures you get the highest possible rates for your gift cards. 
                  We continuously monitor market conditions to provide competitive rates.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Real-time market rates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Instant price quotes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">No hidden fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose IT?</h2>
              <p className="text-lg text-gray-600">
                We provide the most reliable and efficient gift card trading service in Wuhan
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="fade-up bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
                <p className="text-gray-600">
                  Get your cash within minutes. Our automated system processes transactions instantly.
                </p>
              </div>

              <div className="fade-up bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">100% Secure</h3>
                <p className="text-gray-600">
                  Bank-level security ensures your transactions are safe and your data is protected.
                </p>
              </div>

              <div className="fade-up bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
                <p className="text-gray-600">
                  Our customer support team is available around the clock to help you with any questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Gift Cards Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Gift Card to <span className="text-teal-600">Trade</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our recommended card types generally offer higher exchange rates, stability, and security.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Steam Card */}
              <div className="fade-up bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="/images/st.png" 
                    alt="Steam" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-semibold text-gray-700">STEAM</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Steam</h3>
                <p className="text-gray-600 mb-6">Steam Card / eCode</p>
                <button 
                  onClick={() => handleWhatsAppClick('Hello! I would like to get a quote for gift cards.', 'whatsapp-steam')}
                  data-track="jump"
                  data-id="whatsapp-steam"
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Enquire Now
                </button>
              </div>

              {/* Xbox Card */}
              <div className="fade-up bg-teal-50 border border-teal-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="/images/xb.png" 
                    alt="Xbox" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-semibold text-gray-700">XBOX</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">XBox</h3>
                <p className="text-gray-600 mb-6">XBox Physical Card</p>
                <button 
                  onClick={() => handleWhatsAppClick('Hello! I would like to get a quote for gift cards.', 'whatsapp-xbox')}
                  data-track="jump"
                  data-id="whatsapp-xbox"
                  className="w-full bg-white text-teal-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-teal-600"
                >
                  Enquire Now
                </button>
              </div>

              {/* Apple Card */}
              <div className="fade-up bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="/images/it.png" 
                    alt="Apple" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-semibold text-gray-700">iTunes</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Apple</h3>
                <p className="text-gray-600 mb-6">Apple Physical Card</p>
                <button 
                  onClick={() => handleWhatsAppClick('Hello! I would like to get a quote for gift cards.', 'whatsapp-apple')}
                  data-track="jump"
                  data-id="whatsapp-apple"
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Enquire Now
                </button>
              </div>

              {/* Razer Gold Card */}
              <div className="fade-up bg-teal-50 border border-teal-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="/images/fl.png" 
                    alt="Razer Gold" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-semibold text-gray-700">RAZER GOLD</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Razer</h3>
                <p className="text-gray-600 mb-6">Razer Gold Card / code</p>
                <button 
                  onClick={() => handleWhatsAppClick('Hello! I would like to get a quote for gift cards.', 'whatsapp-razer')}
                  data-track="jump"
                  data-id="whatsapp-razer"
                  className="w-full bg-white text-teal-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-teal-600"
                >
                  Enquire Now
        </button>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
              <p className="text-lg text-gray-600">
                Comprehensive gift card trading solutions for all your needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="fade-up text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Gift Card Trading</h3>
                <p className="text-gray-600">
                  Trade your gift cards for cash at competitive rates. We accept all major gift card brands.
                </p>
              </div>

              <div className="fade-up text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Best Rates</h3>
                <p className="text-gray-600">
                  Get the highest rates in the market with our advanced pricing algorithm.
                </p>
              </div>

              <div className="fade-up text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Processing</h3>
                <p className="text-gray-600">
                  Receive your payment within minutes with our automated processing system.
        </p>
      </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-lg text-gray-600">Meet our professional trading team</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Trader_Ki */}
              <div className="fade-up bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
                  <img 
                    src="/images/t1.png" 
                    alt="Trader_Ki" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trader_Ki</h3>
                <p className="text-gray-600 mb-4">Manageress</p>
                <div className="flex justify-center space-x-3">
                  <button 
                    onClick={() => handleTeamWhatsAppClick('8615337211812', 'Trader_Ki')}
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleTelegramClick('IT_gift_card')}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleTikTokClick('miss.rich77')}
                    className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Trader_Xing */}
              <div className="fade-up bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
                  <img 
                    src="/images/t2.png" 
                    alt="Trader_Xing" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trader_Xing</h3>
                <p className="text-gray-600 mb-4">Manageress</p>
                <div className="flex justify-center space-x-3">
                  <button 
                    onClick={() => handleTeamWhatsAppClick('8615337211812', 'Trader_Xing')}
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleTelegramClick('IT_gift_card')}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleTikTokClick('miss.rich77')}
                    className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Trader_Tian */}
              <div className="fade-up bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
                  <img 
                    src="/images/t3.png" 
                    alt="Trader_Tian" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trader_Tian</h3>
                <p className="text-gray-600 mb-4">Manageress</p>
                <div className="flex justify-center space-x-3">
                  <button 
                    onClick={() => handleTeamWhatsAppClick('8615337211812', 'Trader_Tian')}
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleTelegramClick('IT_gift_card')}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleTikTokClick('miss.rich77')}
                    className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Trader_Zhe */}
              <div className="fade-up bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
                  <img 
                    src="/images/t4.png" 
                    alt="Trader_Zhe" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trader_Zhe</h3>
                <p className="text-gray-600 mb-4">Manageress</p>
                <div className="flex justify-center space-x-3">
                  <button 
                    onClick={() => handleTeamWhatsAppClick('8615337211812', 'Trader_Zhe')}
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleTelegramClick('IT_gift_card')}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleTikTokClick('miss.rich77')}
                    className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Customer Feedback Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
              <p className="text-lg text-gray-600">Don't just take our word for it - hear from our satisfied customers</p>
            </div>

            {/* Transaction Details Images Carousel */}
            <div className="mb-16 fade-up">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Transaction Details</h3>
                <p className="text-lg text-gray-600">Real transaction screenshots from our customers</p>
              </div>
              
              <div className="relative overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" id="transaction-images-carousel">
                  {/* Transaction Images 1-15 */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
                    <div key={num} className="w-full flex-shrink-0 px-4">
                      <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                          <img 
                            src={`/images/${num}.png`} 
                            alt={`Transaction ${num}`}
                            className="w-full h-auto rounded-lg object-contain"
                            style={{maxHeight: '400px'}}
                          />
                          <div className="mt-4 text-center">
                            <span className="text-sm text-gray-500">Transaction #{num}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <button 
                  onClick={() => {
                    const carousel = document.getElementById('transaction-images-carousel');
                    if (carousel) {
                      const currentTransform = carousel.style.transform;
                      const currentIndex = currentTransform ? parseInt(currentTransform.match(/-(\d+)%/)![1]) / 100 : 0;
                      const newIndex = currentIndex === 0 ? 14 : currentIndex - 1;
                      carousel.style.transform = `translateX(-${newIndex * 100}%)`;
                    }
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors z-10"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => {
                    const carousel = document.getElementById('transaction-images-carousel');
                    if (carousel) {
                      const currentTransform = carousel.style.transform;
                      const currentIndex = currentTransform ? parseInt(currentTransform.match(/-(\d+)%/)![1]) / 100 : 0;
                      const newIndex = (currentIndex + 1) % 15;
                      carousel.style.transform = `translateX(-${newIndex * 100}%)`;
                    }
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors z-10"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Auto-play indicator */}
              <div className="text-center mt-4">
                <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                  <span>Auto-playing transaction details</span>
                </div>
              </div>
            </div>
            
            {/* Customer Testimonials Carousel */}
            <div className="relative overflow-hidden fade-up">
              <div className="flex transition-transform duration-500 ease-in-out" id="testimonials-carousel">
                {/* Testimonial 1 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Excellent service! Fast and reliable gift card trading. I've been using IT for over a year now and never had any issues."
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">J</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">John Smith</div>
                          <div className="text-sm text-gray-500">Regular Customer</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Best rates in Wuhan! Highly recommended for gift card trading. The process is simple and the support team is very helpful."
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Maria Garcia</div>
                          <div className="text-sm text-gray-500">Business Owner</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 3 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Professional service with 24/7 support. Very satisfied with the transaction speed and security. Will definitely use again!"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">D</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">David Chen</div>
                          <div className="text-sm text-gray-500">Student</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 4 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Amazing platform! The rates are competitive and the process is so smooth. I've recommended IT to all my friends."
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Sarah Johnson</div>
                          <div className="text-sm text-gray-500">Frequent Trader</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 5 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Lightning fast transactions! I sold my Steam cards in minutes and got paid immediately. Highly recommended!"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Alex Wang</div>
                          <div className="text-sm text-gray-500">Gamer</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 6 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Trustworthy and reliable! I've been trading with IT for months and always get the best rates. Customer service is excellent."
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">L</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Lisa Zhang</div>
                          <div className="text-sm text-gray-500">Online Seller</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 7 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Outstanding customer service! The team is always helpful and responds quickly. Best gift card exchange platform in Wuhan!"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Robert Liu</div>
                          <div className="text-sm text-gray-500">Tech Enthusiast</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 8 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Simple, fast, and secure! I love how easy it is to trade my gift cards. The rates are always fair and competitive."
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">E</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Emma Wilson</div>
                          <div className="text-sm text-gray-500">Frequent User</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 9 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Perfect platform for gift card trading! The process is straightforward and I always get my money quickly. 5 stars!"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">T</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Tom Brown</div>
                          <div className="text-sm text-gray-500">Regular Trader</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 10 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Excellent rates and instant payments! I've tried other platforms but IT is definitely the best. Highly recommended!"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">K</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Kevin Lee</div>
                          <div className="text-sm text-gray-500">Gift Card Collector</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 11 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Fast, reliable, and trustworthy! I've been using IT for months and never had any problems. Great customer support too!"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">N</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Nancy Chen</div>
                          <div className="text-sm text-gray-500">Online Buyer</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 12 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Amazing service! The rates are always competitive and the transaction process is super smooth. Will definitely continue using IT!"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Mike Zhang</div>
                          <div className="text-sm text-gray-500">Digital Nomad</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 13 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Top-notch platform! The security is excellent and I always get the best rates. Customer service is responsive and helpful."
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">H</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Helen Wang</div>
                          <div className="text-sm text-gray-500">Tech Professional</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 14 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Reliable and fast! I've been trading gift cards for years and IT offers the best rates and fastest processing. Highly recommended!"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Chris Liu</div>
                          <div className="text-sm text-gray-500">Experienced Trader</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 15 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        "Perfect experience every time! The platform is user-friendly, secure, and offers great rates. I've recommended IT to many friends!"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Anna Kim</div>
                          <div className="text-sm text-gray-500">Loyal Customer</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-10"
                onClick={() => {
                  const carousel = document.getElementById('testimonials-carousel');
                  if (carousel) {
                    const currentTransform = carousel.style.transform;
                    const currentIndex = currentTransform ? parseInt(currentTransform.match(/-(\d+)%/)![1]) / 100 : 0;
                    const newIndex = currentIndex === 0 ? 14 : currentIndex - 1;
                    carousel.style.transform = `translateX(-${newIndex * 100}%)`;
                  }
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-10"
                onClick={() => {
                  const carousel = document.getElementById('testimonials-carousel');
                  if (carousel) {
                    const currentTransform = carousel.style.transform;
                    const currentIndex = currentTransform ? parseInt(currentTransform.match(/-(\d+)%/)![1]) / 100 : 0;
                    const newIndex = (currentIndex + 1) % 15;
                    carousel.style.transform = `translateX(-${newIndex * 100}%)`;
                  }
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-1 mt-6 fade-up">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((dot) => (
                <button
                  key={dot}
                  className="w-2 h-2 rounded-full bg-gray-300 hover:bg-teal-500 transition-colors duration-300"
                  onClick={() => {
                    const carousel = document.getElementById('testimonials-carousel');
                    if (carousel) {
                      carousel.style.transform = `translateX(-${(dot - 1) * 100}%)`;
                    }
                  }}
                />
              ))}
            </div>

            {/* Auto-play Indicator */}
            {/* <div className="text-center mt-4 fade-up">
              <p className="text-sm text-gray-500">Customer testimonials rotate automatically every 4 seconds</p>
            </div> */}
          </div>
        </section>

        {/* FAQ and Footer */}
        <FAQFooter />
      </main>
    </div>
  );
};

// 页面浏览跟踪组件
const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // 获取页面名称
    const getPageName = (pathname: string) => {
      switch (pathname) {
        case '/':
          return 'Home';
        case '/about':
          return 'About';
        case '/services':
          return 'Services';
        case '/contact':
          return 'Contact';
        default:
          return 'Unknown';
      }
    };

    // 跟踪页面浏览
    const pageName = getPageName(location.pathname);
    trackPageView(pageName);
    
    // 页面浏览转化跟踪 - 使用原来的标签ID
    trackPageConversion();
    
    // 跟踪自定义事件
    trackEvent('page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: location.pathname
    });
  }, [location]);

  return null; // 这个组件不渲染任何内容
};

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <PageTracker />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ChatWidget />
      </div>
    </Router>
  );
};

export default App;