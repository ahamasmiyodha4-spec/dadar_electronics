"use client";

import Image from 'next/image';
import logo from '../../public/logo.jpg';
import { useState, useEffect, useRef } from 'react';
import data from '../data/inventory.json';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface StoreInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  website: string;
}

interface InventoryData {
  categories: Category[];
  storeInfo: StoreInfo;
}

const typedData = data as InventoryData;

// A simplified count-up hook for premium stats
function useCountUp(endValue: number, duration: number = 2000, trigger: boolean = false) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      setCount(Math.floor(progress * endValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [endValue, duration, trigger]);

  return count;
}

// Staggered Scroll Reveal Component
function ScrollReveal({ children, delay = 0, initialY = 12 }: { children: React.ReactNode; delay?: number; initialY?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0 filter blur-0" : `opacity-0 translate-y-${initialY} filter blur-[2px]`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// User Review Card Component
function ReviewCard({ name, role, review }: { name: string; role: string; review: string }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 relative group flex flex-col justify-between h-full min-w-full">
      <span className="absolute top-4 right-4 text-xs font-bold text-gray-400 group-hover:text-[#2848CC] transition-colors">⭐️⭐️⭐️⭐️⭐️</span>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 border border-gray-200 text-lg font-bold flex items-center justify-center text-[#2848CC]">
            {name[0]}
          </div>
          <div>
            <h4 className="font-bold text-gray-950">{name}</h4>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed mb-6">“{review}”</p>
      </div>
      <p className="text-xs font-medium text-[#E60000] italic mt-auto">Verified Purchaser</p>
    </div>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroTrigger, setHeroTrigger] = useState(false);
  const [activeLaptopIndex, setActiveLaptopIndex] = useState(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const laptopImages = [
    '/laptop2.png',
    '/laptop3.png',
    '/laptop1.png'
  ];

  const reviewData = [
    { name: "Omar K.", role: "Business Operations Leader, Dubai", review: "Dadar Electronics delivers unparalleled quality and professional service. Their wholesale support is incredible!" },
    { name: "Elena P.", role: "Wholesale Partner, London", review: "They are truly a global family of business owners. Their tech is genuine, and the competitive wholesale pricing made scaling simple!" },
    { name: "Ahmad M.", role: "Retail Customer, Abu Dhabi", review: "Found the exact high-performance laptop I needed for my office. Authentic products, speedy fulfillment, and clear communication." }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const timeout = setTimeout(() => setHeroTrigger(true), 200);

    const productInterval = setInterval(() => {
      setActiveLaptopIndex((prev) => (prev + 1) % laptopImages.length);
    }, 4000);

    const reviewInterval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviewData.length);
    }, 3000);

    return () => {
      clearInterval(productInterval);
      clearInterval(reviewInterval);
      clearTimeout(timeout);
    };
  }, [laptopImages.length, reviewData.length]);

  const partnerCount = useCountUp(1500, 2000, heroTrigger);
  const customerCount = useCountUp(50000, 20000, heroTrigger);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden scroll-smooth relative">
      
      {/* 1. BRIGHT PREMIUM SIDE-OPENING MOBILE MENU (Off-Canvas Glassmorphism) */}
      <div 
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white/95 backdrop-blur-md shadow-2xl border-l border-gray-100 z-50 p-8 flex flex-col justify-between transition-transform duration-500 ease-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2848CC]">Navigation</h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-900 p-1 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <nav className="space-y-5">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold text-gray-900 hover:text-[#2848CC] transition-colors py-1">About Us</a>
            <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold text-gray-900 hover:text-[#2848CC] transition-colors py-1">Our Products</a>
            <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold text-gray-900 hover:text-[#2848CC] transition-colors py-1">Reviews</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold text-gray-900 hover:text-[#2848CC] transition-colors py-1">Contact</a>
            
            <div className="pt-6">
              <a 
                href={`https://wa.me/${typedData.storeInfo.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block w-full text-center bg-[#E60000] text-white px-5 py-3.5 rounded-xl font-bold text-base hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-red-500/20 active:scale-98"
              >
                WhatsApp Us
              </a>
            </div>
          </nav>
        </div>
        
        <div className="border-t border-gray-100 pt-6 text-xs text-gray-400 font-medium">
          <p>© {new Date().getFullYear()} Dadar Electronics</p>
          <p className="mt-0.5 text-gray-500">Dubai, UAE</p>
        </div>
      </div>

      {/* FLOATING WHATSAPP ICON */}
      <a
        href={`https://wa.me/${typedData.storeInfo.whatsapp}?text=${encodeURIComponent("Hello Dadar Electronics, I am browsing your website and have an inquiry.")}`}
        target="_blank" rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: '1600ms' }}
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none"></span>
        <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.516 2.266 2.27 3.507 5.283 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.295 1.503 4.988 1.504 5.485 0 9.95-4.463 9.954-9.948.002-2.658-1.033-5.156-2.915-7.04C16.835 1.805 14.342.766 11.683.766c-5.492 0-9.959 4.464-9.963 9.949-.001 1.83.499 3.614 1.448 5.2l-.995 3.636 3.731-.978zm11.393-5.284c-.314-.157-1.855-.915-2.137-1.018-.282-.102-.487-.153-.692.157-.204.307-.793 1.017-.971 1.222-.178.205-.357.23-.671.074-1.742-.87-2.915-1.554-4.086-3.564-.309-.53.309-.492.885-1.64.095-.192.047-.361-.024-.518-.071-.157-.692-1.666-.949-2.284-.25-.601-.504-.519-.692-.529-.178-.009-.383-.01-.59-.01c-.204 0-.537.077-.818.384-.282.308-1.077 1.051-1.077 2.564 0 1.513 1.101 2.972 1.254 3.177.154.205 2.167 3.31 5.248 4.64.733.317 1.307.507 1.754.65.736.233 1.407.2 1.937.12.59-.088 1.854-.758 2.115-1.455.26-.695.26-1.293.183-1.417-.077-.123-.282-.196-.595-.354z"/></svg>
        <span className="absolute right-16 bg-white text-gray-900 font-bold text-sm px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">Chat with Us</span>
      </a>

      {/* HEADER */}
      <header className={`bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b border-gray-100 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Image src={logo} alt="Dadar Electronics Logo" width={200} height={100} className="h-12 sm:h-14 md:h-20 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" priority/>
            <div className={`flex flex-col justify-center transition-all duration-1000 ease-out delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <span className="text-sm sm:text-lg md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2848CC] to-[#1a2d80] tracking-tight leading-none mb-0.5 md:mb-1">Dadar Electronics</span>
              <span className="text-[9px] sm:text-[11px] md:text-xs font-bold text-[#E60000] tracking-widest uppercase leading-none">Trading LLC</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#about" className="text-gray-600 hover:text-[#2848CC] font-bold text-base lg:text-lg tracking-wide transition-colors">About Us</a>
            <a href="#products" className="text-gray-600 hover:text-[#2848CC] font-bold text-base lg:text-lg tracking-wide transition-colors">Our Products</a>
            <a href="#reviews" className="text-gray-600 hover:text-[#2848CC] font-bold text-base lg:text-lg tracking-wide transition-colors">Reviews</a>
            <a href="#contact" className="text-gray-600 hover:text-[#2848CC] font-bold text-base lg:text-lg tracking-wide transition-colors">Contact</a>
            <a href={`https://wa.me/${typedData.storeInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="ml-2 bg-[#E60000] text-white px-6 py-3 rounded-full font-bold text-base lg:text-lg hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all">WhatsApp Us</a>
          </nav>

          <button className="md:hidden p-2 text-gray-700 hover:text-[#2848CC] focus:outline-none" onClick={() => setIsMobileMenuOpen(true)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </header>

      {/* HERO SECTION WITH DYNAMIC LUXURY COUNTERS */}
      <section className="bg-gradient-to-br from-[#2848CC] via-blue-700 to-[#1a2d80] text-white py-20 md:py-24 lg:py-36 relative overflow-hidden shadow-inner">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400 opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          
          <h1 className={`text-[32px] sm:text-5xl lg:text-7xl font-black tracking-tight mb-4 md:mb-6 leading-tight max-w-2xl px-2 transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Premium Electronics <br /> in Dubai
          </h1>
          
          {/* STATS BAR */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-y-8 sm:gap-y-0 sm:gap-x-16 my-10 max-w-xl w-full mx-auto px-4 transition-all duration-1000 ease-out delay-200 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center w-full sm:w-auto">
              <span className="text-[44px] sm:text-5xl lg:text-6xl font-black tabular-nums tracking-tight text-white block leading-none">
                {partnerCount.toLocaleString()}<span className="text-2xl sm:text-3xl font-bold text-white/80 ml-0.5">+</span>
              </span>
              <p className="text-[11px] sm:text-xs font-bold text-blue-200 uppercase tracking-widest mt-2">Global Partners</p>
            </div>
            
            <div className="hidden sm:block h-12 w-[1px] bg-white/20 self-center"></div>
            
            <div className="text-center w-full sm:w-auto">
              <span className="text-[44px] sm:text-5xl lg:text-6xl font-black tabular-nums tracking-tight text-white block leading-none">
                {customerCount.toLocaleString()}<span className="text-2xl sm:text-3xl font-bold text-white/80 ml-0.5">+</span>
              </span>
              <p className="text-[11px] sm:text-xs font-bold text-blue-200 uppercase tracking-widest mt-2">Happy Customers</p>
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 px-4 w-full sm:w-auto transition-all duration-1000 ease-out delay-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a href="#products" className="bg-[#E60000] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto">View Categories</a>
            <a href="#contact" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#2848CC] hover:scale-105 transition-all w-full sm:w-auto">Visit Store</a>
          </div>
        </div>
      </section>

      {/* REVIEWS SLIDER */}
      <section id="reviews" className="py-20 md:py-28 bg-white border-y border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50 -skew-y-3 transform-gpu"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <ScrollReveal delay={200}>
            <div className="text-center mb-12">
              <span className="bg-blue-100 text-[#2848CC] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 inline-block">Trusted & Professional</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-950 max-w-2xl mx-auto">Hear From Our<br/> Growing Global Family</h2>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={400} initialY={16}>
            <div className="relative w-full overflow-hidden px-1 py-4">
              <div 
                className="flex transition-transform duration-700 ease-in-out will-change-transform"
                style={{ transform: `translateX(-${activeReviewIndex * 100}%)` }}
              >
                {reviewData.map((item, idx) => (
                  <div key={idx} className="w-full min-w-full field-contain px-2 sm:px-4">
                    <ReviewCard name={item.name} role={item.role} review={item.review} />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center gap-2.5 mt-8">
                {reviewData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReviewIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeReviewIndex ? 'w-7 bg-[#2848CC]' : 'w-2.5 bg-gray-200'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-[#E60000] inline-block pb-2">About Dadar Electronics</h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">Dadar Electronics Trading LLC is a premier technology retailer based in the heart of Dubai. We specialize in providing high-quality, genuine laptops and smartphones to both retail and wholesale customers. With a commitment to excellent customer service and competitive pricing, we ensure you get the best tech solutions for your needs.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-[#2848CC] inline-block pb-2">Our Core Categories</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {typedData.categories.map((category, idx) => (
              <ScrollReveal key={category.id} delay={idx * 200}>
                <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="relative w-full h-52 sm:h-64 mb-6 overflow-hidden rounded-xl bg-gray-100 border border-gray-50 shadow-inner">
                      {category.id === 'laptops' ? (
                        laptopImages.map((imgSrc, imgIdx) => (
                          <Image key={imgIdx} src={imgSrc} alt="Premium Laptops Showcase" fill unoptimized className={`object-cover transition-opacity duration-1000 ease-in-out ${imgIdx === activeLaptopIndex ? 'opacity-100' : 'opacity-0'}`} sizes="(max-w-7xl) 50vw, 100vw"/>
                        ))
                      ) : (
                        <Image src="/mobile1.png" alt="Smartphones & Mobiles Showcase" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-w-7xl) 50vw, 100vw"/>
                      )}
                      <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-md uppercase z-20">{category.icon} {category.id}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#2848CC] transition-colors duration-300">{category.name}</h3>
                    <p className="text-gray-500 mb-6 md:mb-8 leading-relaxed">{category.description}</p>
                  </div>
                  <a href={`https://wa.me/${typedData.storeInfo.whatsapp}?text=${encodeURIComponent(`Hello Dadar Electronics, I am interested in inquiring about availability and pricing for your ${category.name}.`)}`} target="_blank" rel="noopener noreferrer" className="text-[#2848CC] font-bold inline-flex items-center group-hover:text-[#E60000] transition-colors mt-auto">Inquire about stock <span className="ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT & FOOTER */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#E60000]">Visit Us</h3>
              <p className="mb-2 text-gray-300"><strong>Address:</strong> {typedData.storeInfo.address}</p>
              <p className="mb-2 text-gray-300"><strong>Phone:</strong> {typedData.storeInfo.phone}</p>
              <p className="mb-2 text-gray-300"><strong>Email:</strong> {typedData.storeInfo.email}</p>
              <p className="mb-8 text-gray-300"><strong>Website:</strong> <a href={typedData.storeInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline transition-all">{typedData.storeInfo.website.replace('https://www.', '')}</a></p>
              <a href={`https://wa.me/${typedData.storeInfo.whatsapp}`} className="inline-block bg-[#2848CC] text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition w-full md:w-auto text-center">Chat on WhatsApp</a>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#E60000]">Store Hours</h3>
              <ul className="space-y-3 text-gray-300">
                <li>Monday - Sunday: 10:00 AM - 10:00 PM</li>
                <li>Friday: 03:00 PM - 10:00 PM</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">© {new Date().getFullYear()} Dadar Electronics Trading LLC. All rights reserved.</div>
        </ScrollReveal>
      </footer>

    </div>
  );
}