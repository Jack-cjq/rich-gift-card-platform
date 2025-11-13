import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FAQFooter from '../components/FAQFooter';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.fade-up').forEach((element) => {
        gsap.fromTo(element, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-up">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src="/images/logo.png" 
                alt="Rich Logo" 
                className="w-16 h-16 object-contain"
              />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Our <span className="text-teal-600">Services</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive gift card trading solutions designed to meet all your needs
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600">
              Professional and fast service for all your gift card needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gift Card Trading */}
            <div className="fade-up bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gift Card Trading</h3>
              <p className="text-gray-600 mb-6">
                Trade your gift cards for cash at competitive rates. We accept all major gift card brands 
                including iTunes, Steam, Xbox, PlayStation, and many more.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Instant cash payments
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Best market rates
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Secure transactions
                </li>
              </ul>
            </div>

            {/* Crypto Trading */}
            <div className="fade-up bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Crypto Trading</h3>
              <p className="text-gray-600 mb-6">
                Exchange your cryptocurrencies for cash or other digital assets. We support major 
                cryptocurrencies including Bitcoin, Ethereum, USDT, and more.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Multiple crypto support
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real-time rates
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Fast processing
                </li>
              </ul>
            </div>

            {/* Payment Solutions */}
            <div className="fade-up bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Solutions</h3>
              <p className="text-gray-600 mb-6">
                Multiple payment options to receive your funds quickly and securely. 
                Choose from bank transfers, mobile money, or digital wallets.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Bank transfers
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mobile money
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Digital wallets
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Supported Gift Cards</h2>
            <p className="text-lg text-gray-600">
              We accept a wide variety of gift cards from popular brands
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: "iTunes", icon: "🍎" },
              { name: "Steam", icon: "🎮" },
              { name: "Xbox", icon: "🎮" },
              { name: "PlayStation", icon: "🎮" },
              { name: "Amazon", icon: "📦" },
              { name: "Google Play", icon: "📱" },
              { name: "Netflix", icon: "🎬" },
              { name: "Spotify", icon: "🎵" },
              { name: "Sephora", icon: "💄" },
              { name: "Nike", icon: "👟" },
              { name: "Adidas", icon: "👟" },
              { name: "eBay", icon: "🛒" }
            ].map((card, index) => (
              <div key={index} className="fade-up bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{card.icon}</div>
                <div className="font-semibold text-gray-900">{card.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Simple steps to trade your gift cards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="fade-up text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-600">
                Reach out to us via WhatsApp with details of your gift card. 
                We'll provide you with a competitive quote.
              </p>
            </div>

            <div className="fade-up text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verify & Trade</h3>
              <p className="text-gray-600">
                Our team verifies your gift card details and processes the trade. 
                This usually takes just a few minutes.
              </p>
            </div>

            <div className="fade-up text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Paid</h3>
              <p className="text-gray-600">
                Receive your payment instantly through your preferred method. 
                Bank transfer, mobile money, or digital wallet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gift Cards Section */}
      <section className="py-20 bg-white">
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
                    const phoneNumber = '85294590690';
                    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
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
                    const phoneNumber = '85294590690';
                    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Enquire Now
                </button>
            </div>

            {/* Foot Locker Card */}
            <div className="fade-up bg-teal-50 border border-teal-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/images/fl.png" 
                  alt="Foot Locker" 
                  className="w-8 h-8 object-contain"
                />
                <span className="font-semibold text-gray-700">Foot Locker</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Foot Locker</h3>
              <p className="text-gray-600 mb-6">Foot Locker Card / code</p>
              <button className="w-full bg-white text-teal-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-teal-600">
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our clients say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="fade-up">
              <p className="text-lg leading-relaxed mb-6">
                "Without a doubt, this is the best platform for selling gift cards! I used to deal with unreliable platforms offering low rates and slow transaction times. Here, I get the highest rates, lightning-fast payments, and a genuinely caring customer service team. This is how business should be done!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="fade-up bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-6xl text-white/20 mb-4">"</div>
              <p className="text-lg leading-relaxed mb-6">
                "impressive service and I commend this platform for their excellent rates and fast processing. The best gift card trading experience I've had anywhere in the market."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="fade-up bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-lg leading-relaxed mb-6">
                "She is a reliable and trustworthy individual, exceptional payment transactions, and highly experienced in the field. Also friendly and understanding. Love you!"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-lg">C</span>
                </div>
                <div>
                  <div className="font-semibold">Catrina Yoder</div>
                  <div className="text-teal-200 text-sm">CEO Bciaga</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8 fade-up">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* FAQ and Footer */}
      <FAQFooter />
    </div>
  );
};

export default Services;
