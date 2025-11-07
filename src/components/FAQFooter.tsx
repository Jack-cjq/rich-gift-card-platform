import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQFooter: React.FC = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, faqRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={faqRef}>
      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* 左侧 - FAQ */}
            <div className="fade-up">
              <h2 className="text-4xl font-bold text-teal-600 mb-4">FAQ</h2>
              <p className="text-lg text-gray-600 mb-8">
                Easily obtain discount rates and secure payments on IT™.
              </p>

              <div className="space-y-4">
                {/* FAQ Item 1 */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-200 ${
                      openFAQ === 0 ? 'bg-teal-50 border-l-4 border-l-teal-500' : ''
                    }`}
                    onClick={() => toggleFAQ(0)}
                  >
                    <span className={`font-semibold transition-colors ${
                      openFAQ === 0 ? 'text-teal-600' : 'text-gray-900'
                    }`}>How to trade gift cards on IT?</span>
                    <svg 
                      className={`w-5 h-5 transform transition-all duration-300 ${
                        openFAQ === 0 ? 'rotate-180 text-teal-600' : 'text-gray-500'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFAQ === 0 && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed pt-4">
                        Very simple. Tell us via WhatsApp the type of card you want to exchange, the amount, and the country/region, and we will provide you with a quote. If you agree, send us the card as requested. We will verify it and make the payment to you immediately.
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ Item 2 */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-200 ${
                      openFAQ === 1 ? 'bg-teal-50 border-l-4 border-l-teal-500' : ''
                    }`}
                    onClick={() => toggleFAQ(1)}
                  >
                    <span className={`font-semibold transition-colors ${
                      openFAQ === 1 ? 'text-teal-600' : 'text-gray-900'
                    }`}>How are the prices? Which platform is the best?</span>
                    <svg 
                      className={`w-5 h-5 transform transition-all duration-300 ${
                        openFAQ === 1 ? 'rotate-180 text-teal-600' : 'text-gray-500'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFAQ === 1 && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed pt-4">
                        Please note that the prices and exchange rates for various cards are different and may change over time and with the market, which is unpredictable and uncontrollable. Therefore, please confirm the card prices with us via WhatsApp.
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ Item 3 */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-200 ${
                      openFAQ === 2 ? 'bg-teal-50 border-l-4 border-l-teal-500' : ''
                    }`}
                    onClick={() => toggleFAQ(2)}
                  >
                    <span className={`font-semibold transition-colors ${
                      openFAQ === 2 ? 'text-teal-600' : 'text-gray-900'
                    }`}>What types of cards can be traded here?</span>
                    <svg 
                      className={`w-5 h-5 transform transition-all duration-300 ${
                        openFAQ === 2 ? 'rotate-180 text-teal-600' : 'text-gray-500'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFAQ === 2 && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed pt-4">
                        Almost all popular card types on the market can be traded, but please contact us via WhatsApp to confirm specific card types.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 右侧 - FAQ图片 */}
            <div className="fade-up">
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="/images/footFAQ.png" 
                    alt="FAQ Illustration" 
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Redeem a gift card */}
            <div className="fade-up">
              <h3 className="text-lg font-semibold mb-4">Redeem a gift card</h3>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/images/logo.png" 
                  alt="Rich Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="font-bold text-lg">IT</span>
              </div>
              <button 
                onClick={() => {
                  const phoneNumber = '8613277156188';
                  const message = 'Hello! I would like to trade my gift cards now.';
                  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="text-teal-200 mb-4 hover:text-white transition-colors cursor-pointer"
              >
                Trade Now
              </button>
              <p className="text-teal-200">+86 13277156188</p>
            </div>

            {/* IT */}
            <div className="fade-up">
              <h3 className="text-lg font-semibold mb-4">IT</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-teal-200 hover:text-white transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-teal-200 hover:text-white transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-teal-200 hover:text-white transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Useful Links */}
            <div className="fade-up">
              <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-teal-200 hover:text-white transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    iTunes Gift Card
                  </a>
                </li>
                <li>
                  <a href="#" className="text-teal-200 hover:text-white transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Steam Wallet
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="fade-up">
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <div className="space-y-3">
                <div className="flex items-center text-teal-200">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +86 13277156188
                </div>
                <div className="flex items-center text-teal-200">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQFooter;
