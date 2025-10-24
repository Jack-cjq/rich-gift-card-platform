// Google Analytics 工具函数

// 声明全局 gtag 函数
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// 转化跟踪函数
export const trackConversion = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17674508543/bJa3CN3kr7IbEP-x7utB',
      'value': 1.0,
      'currency': 'CNY'
    });
  }
};

// 页面浏览跟踪
export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'AW-17674508543', {
      page_title: pageName,
      page_location: window.location.href
    });
  }
};

// 自定义事件跟踪
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};
