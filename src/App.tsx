import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import pages
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FAQFooter from './components/FAQFooter';
import ChatWidget from './components/ChatWidget';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger);

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
              src="/images/Rich-logo.png" 
              alt="Rich Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-teal-600">Rich</span>
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

          {/* WhatsApp Button */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                const phoneNumber = '8619371138377';
                const message = 'Hello! I would like to get a quote for my gift card.';
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>WhatsApp</span>
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
      gsap.utils.toArray('.fade-up').forEach((element: any) => {
        gsap.fromTo(element, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 数字计数动画 - 简化版本
      gsap.utils.toArray('.count-up').forEach((element: any) => {
        const endValue = parseInt(element.textContent);
        gsap.fromTo(element, 
          { textContent: 0 },
          {
            textContent: endValue,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    let currentIndex = 0;
    const totalSlides = 15;
    
    const interval = setInterval(() => {
      const carousel = document.getElementById('feedback-carousel');
      if (carousel) {
        currentIndex = (currentIndex + 1) % totalSlides;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }, 3000); // Auto-play every 3 seconds

    return () => clearInterval(interval);
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

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="fade-up mb-8">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <img 
                    src="/images/Rich-logo.png" 
                    alt="Rich Logo" 
                    className="w-16 h-16 object-contain"
                  />
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
                    Welcome to <span className="text-teal-600">Rich</span>
                  </h1>
                </div>
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  The largest gift card trading platform in Wuhan. Trade your gift cards for cash at the best rates with lightning-fast processing.
                </p>
              </div>

              <div className="fade-up flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <button 
                  onClick={() => {
                    const phoneNumber = '8619371138377';
                    const message = 'Hello! I would like to start trading my gift cards.';
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
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
            <div className="flex items-center justify-center space-x-8 md:space-x-12">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg p-2 md:p-3">
                  <img 
                    src="/images/fl.png" 
                    alt="Apple" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 font-medium">Apple</span>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg p-2 md:p-3">
                  <img 
                    src="/images/go.png" 
                    alt="Google Play" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 font-medium">Google Play</span>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg p-2 md:p-3">
                  <img 
                    src="/images/it.png" 
                    alt="iTunes" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 font-medium">iTunes</span>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg p-2 md:p-3">
                  <img 
                    src="/images/st.png" 
                    alt="Steam" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 font-medium">Steam</span>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg p-2 md:p-3">
                  <img 
                    src="/images/xb.png" 
                    alt="Xbox" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 font-medium">Xbox</span>
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
                    
                    {/* Razer Gold */}
                    <div className="bg-white/20 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center p-2">
                        <img 
                          src="/images/fl.png" 
                          alt="Razer Gold" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-sm font-semibold">RAZER GOLD</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Rich?</h2>
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

        {/* Customer Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
              <p className="text-lg text-gray-600">
                Don't just take our word for it - hear from our satisfied customers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="fade-up bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Excellent service! Fast and reliable gift card trading. I've been using Rich for over a year now and never had any issues."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">J</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">John Smith</div>
                    <div className="text-sm text-gray-500">Regular Customer</div>
                  </div>
                </div>
              </div>

              <div className="fade-up bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Best rates in Wuhan! Highly recommended for gift card trading. The process is simple and the support team is very helpful."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">M</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Maria Garcia</div>
                    <div className="text-sm text-gray-500">Business Owner</div>
                  </div>
                </div>
              </div>

              <div className="fade-up bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Professional service with 24/7 support. Very satisfied with the transaction speed and security. Will definitely use again!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">D</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">David Chen</div>
                    <div className="text-sm text-gray-500">Student</div>
                  </div>
                </div>
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
                  onClick={() => {
                    const phoneNumber = '8619371138377';
                    const message = 'Hello! I would like to get a quote for gift cards.';
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
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
                <button className="w-full bg-white text-teal-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-teal-600">
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
                  onClick={() => {
                    const phoneNumber = '8619371138377';
                    const message = 'Hello! I would like to get a quote for gift cards.';
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
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
                <button className="w-full bg-white text-teal-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-teal-600">
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

        {/* Customer Feedback Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Customer Feedback</h2>
              <p className="text-lg text-gray-600">Real testimonials from our satisfied customers</p>
            </div>
            
            {/* Carousel Container */}
            <div className="relative overflow-hidden fade-up mb-6 h-96">
              <div className="flex transition-transform duration-500 ease-in-out h-full" id="feedback-carousel">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num, index) => (
                  <div key={num} className="w-full flex-shrink-0 px-4 h-full flex items-center">
                    <div className="max-w-sm mx-auto w-full">
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                        <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 flex-shrink-0">
                          <img 
                            src={`/images/${num}.png`} 
                            alt={`Customer feedback ${num}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center space-x-1 mb-2 flex-shrink-0">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm flex-grow">
                          {index % 3 === 0 && "Excellent service! Fast and reliable gift card trading."}
                          {index % 3 === 1 && "Best rates in Wuhan! Highly recommended for gift card trading."}
                          {index % 3 === 2 && "Professional service with 24/7 support. Very satisfied!"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-10"
                onClick={() => {
                  const carousel = document.getElementById('feedback-carousel');
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
                  const carousel = document.getElementById('feedback-carousel');
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
                  className="w-2 h-2 rounded-full bg-gray-300 hover:bg-green-600 transition-colors duration-300"
                  onClick={() => {
                    const carousel = document.getElementById('feedback-carousel');
                    if (carousel) {
                      carousel.style.transform = `translateX(-${(dot - 1) * 100}%)`;
                    }
                  }}
                ></button>
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="text-center mt-4 fade-up">
              <p className="text-sm text-gray-500">Customer feedback rotates automatically every 3 seconds</p>
            </div>
          </div>
        </section>

        {/* FAQ and Footer */}
        <FAQFooter />
      </main>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
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