import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FAQFooter from '../components/FAQFooter';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 数字计数动画
      gsap.utils.toArray('.count-up').forEach((element: any) => {
        const target = parseInt(element.dataset.target);
        gsap.fromTo(element, 
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 基础滚动动画
      gsap.utils.toArray('.fade-up').forEach((element: any) => {
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

      // 旋转动画
      gsap.utils.toArray('.rotate-animation').forEach((element: any) => {
        gsap.to(element, {
          rotation: 360,
          duration: 20,
          ease: "none",
          repeat: -1
        });
      });

      // 浮动动画
      gsap.utils.toArray('.float-animation').forEach((element: any) => {
        gsap.to(element, {
          y: -20,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      });

      // 脉冲动画
      gsap.utils.toArray('.pulse-animation').forEach((element: any) => {
        gsap.to(element, {
          scale: 1.1,
          duration: 1.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      });

      // 进度条动画
      gsap.utils.toArray('.progress-bar').forEach((element: any) => {
        const width = element.dataset.width;
        gsap.fromTo(element, 
          { width: "0%" },
          {
            width: width,
            duration: 2,
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
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* 动态背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          {/* 浮动图标 */}
          <div className="absolute top-32 left-1/4 float-animation">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">🎁</span>
            </div>
          </div>
          <div className="absolute top-48 right-1/4 float-animation" style={{animationDelay: '1s'}}>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">💳</span>
            </div>
          </div>
          <div className="absolute bottom-32 left-1/3 float-animation" style={{animationDelay: '2s'}}>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center fade-up">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src="/images/logo.png" 
                alt="Rich Logo" 
                className="w-20 h-20 object-contain pulse-animation"
              />
              <h1 className="text-4xl md:text-7xl font-bold text-gray-900">
                About <span className="text-green-600">IT</span>
              </h1>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto shadow-xl">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Wuhan's Largest Gift Card Trading Platform
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Since our establishment in 2021, IT has become the most trusted gift card trading platform in Wuhan.
                We are committed to providing the highest quality gift card trading services, making every transaction safe, fast, and convenient.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">✓ Wuhan's Largest Platform</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">✓ 24/7 Online Service</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">✓ Secure & Reliable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-lg text-gray-600">Data speaks for itself, witnessing IT's growth</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="fade-up text-center bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">👥</span>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                <span className="count-up" data-target="50000">0</span>+
              </div>
              <div className="text-gray-600 font-semibold">Satisfied Customers</div>
            </div>
            
            <div className="fade-up text-center bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">💳</span>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <span className="count-up" data-target="1000000">0</span>+
              </div>
              <div className="text-gray-600 font-semibold">Trading Volume (CNY)</div>
            </div>
            
            <div className="fade-up text-center bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">🏆</span>
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                <span className="count-up" data-target="3">0</span> Years
              </div>
              <div className="text-gray-600 font-semibold">Professional Experience</div>
            </div>
            
            <div className="fade-up text-center bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">⭐</span>
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                <span className="count-up" data-target="99">0</span>%
              </div>
              <div className="text-gray-600 font-semibold">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* 我们的优势 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose IT?</h2>
            <p className="text-lg text-gray-600">Advantages of Wuhan's leading gift card trading platform</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Wuhan's Largest Platform</h3>
                    <p className="text-gray-600">As Wuhan's largest gift card trading platform, we have the richest resources and highest quality services.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast Trading</h3>
                    <p className="text-gray-600">Average transaction time under 5 minutes, ensuring your funds arrive quickly.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🛡️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
                    <p className="text-gray-600">Using bank-grade security encryption technology to ensure every transaction is safe and reliable.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Customer Support</h3>
                    <p className="text-gray-600">Professional customer service team available around the clock to answer your questions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-up">
              <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 rotate-animation">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎁</span>
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Trading Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <span>Contact customer service or submit online</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <span>Provide gift card information</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <span>Quick evaluation and quote</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <span>Confirm transaction and receive payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 公司图片展示 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Company</h2>
            <p className="text-lg text-gray-600">Professional team, modern office, and excellent working environment</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="fade-up">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src="/images/c1.jpg" 
                  alt="Company Office 1" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Office</h3>
                  <p className="text-gray-600">Professional working environment with advanced facilities</p>
                </div>
              </div>
            </div>
            
            <div className="fade-up">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src="/images/c2.jpg" 
                  alt="Company Office 2" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Team Collaboration</h3>
                  <p className="text-gray-600">Dedicated team working together to provide the best service</p>
                </div>
              </div>
            </div>
            
            <div className="fade-up">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src="/images/c3.jpg" 
                  alt="Company Office 3" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Environment</h3>
                  <p className="text-gray-600">State-of-the-art facilities for efficient operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 服务能力 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Service Capabilities</h2>
            <p className="text-lg text-gray-600">Professional team, professional service</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="fade-up bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Evaluation</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Evaluation Accuracy</span>
                  <span className="text-green-600 font-bold">99%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="progress-bar bg-green-500 h-2 rounded-full" data-width="99%"></div>
                </div>
              </div>
            </div>
            
            <div className="fade-up bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trading Speed</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Processing Time</span>
                  <span className="text-blue-600 font-bold">3 Minutes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="progress-bar bg-blue-500 h-2 rounded-full" data-width="95%"></div>
                </div>
              </div>
            </div>
            
            <div className="fade-up bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Security Assurance</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Security Level</span>
                  <span className="text-purple-600 font-bold">Bank-Grade</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="progress-bar bg-purple-500 h-2 rounded-full" data-width="100%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Trading?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join Wuhan's largest gift card trading platform and enjoy professional, secure, and fast service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const phoneNumber = '8619371138377';
                  const message = 'Hello! I would like to get a WhatsApp consultation for gift card trading.';
                  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>WhatsApp Consultation</span>
              </button>
              <button 
                onClick={() => {
                  const phoneNumber = '8619371138377';
                  const message = 'Hello! I would like to start trading my gift cards now.';
                  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Start Trading Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ and Footer */}
      <FAQFooter />
    </div>
  );
};

export default About;