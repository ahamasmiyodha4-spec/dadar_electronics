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

// Reusable Scroll Animation Component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0 filter blur-0" : "opacity-0 translate-y-12 filter blur-[2px]"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLaptopIndex, setActiveLaptopIndex] = useState(0);

  const laptopImages = [
    '/laptop2.png',
    '/laptop3.png',
    '/laptop1.png'
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveLaptopIndex((prev) => (prev + 1) % laptopImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [laptopImages.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden scroll-smooth relative">
      
      {/* FLOATING WHATSAPP ICON */}
      <a
        href={`https://wa.me/${typedData.storeInfo.whatsapp}?text=${encodeURIComponent("Hello Dadar Electronics, I am browsing your website and have an inquiry.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: '1200ms' }} // Fades in smoothly after header and hero run their entrance animations
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing Outer Glow Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none"></span>
        
        {/* SVG WhatsApp Graphic Asset */}
        <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.516 2.266 2.27 3.507 5.283 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.295 1.503 4.988 1.504 5.485 0 9.95-4.463 9.954-9.948.002-2.658-1.033-5.156-2.915-7.04C16.835 1.805 14.342.766 11.683.766c-5.492 0-9.959 4.464-9.963 9.949-.001 1.83.499 3.614 1.448 5.2l-.995 3.636 3.731-.978zm11.393-5.284c-.314-.157-1.855-.915-2.137-1.018-.282-.102-.487-.153-.692.157-.204.307-.793 1.017-.971 1.222-.178.205-.357.23-.671.074-1.742-.87-2.915-1.554-4.086-3.564-.309-.53.309-.492.885-1.64.095-.192.047-.361-.024-.518-.071-.157-.692-1.666-.949-2.284-.25-.601-.504-.519-.692-.529-.178-.009-.383-.01-.59-.01c-.204 0-.537.077-.818.384-.282.308-1.077 1.051-1.077 2.564 0 1.513 1.101 2.972 1.254 3.177.154.205 2.167 3.31 5.248 4.64.733.317 1.307.507 1.754.65.736.233 1.407.2 1.937.12.59-.088 1.854-.758 2.115-1.455.26-.695.26-1.293.183-1.417-.077-.123-.282-.196-.595-.354z"/>
        </svg>

        {/* Floating Tooltip Pill */}
        <span className="absolute right-16 bg-white text-gray-900 font-bold text-sm px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
          Chat with Us
        </span>
      </a>

      {/* HEADER */}
      <header className={`bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex justify-between items-center">
          
          {/* LOGO & BRAND NAME AREA */}
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Image 
              src={logo} 
              alt="Dadar Electronics Logo" 
              width={200}
              height={100}
              className="h-12 sm:h-14 md:h-20 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" 
              priority
            />
            
            <div className={`flex flex-col justify-center transition-all duration-1000 ease-out delay-300 transform ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <span className="text-sm sm:text-lg md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2848CC] to-[#1a2d80] tracking-tight leading-none mb-0.5 md:mb-1">
                Dadar Electronics
              </span>
              <span className="text-[9px] sm:text-[11px] md:text-xs font-bold text-[#E60000] tracking-widest uppercase leading-none">
                Trading LLC
              </span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#about" className="text-gray-600 hover:text-[#2848CC] font-bold text-base lg:text-lg tracking-wide transition-colors duration-300">About Us</a>
            <a href="#products" className="text-gray-600 hover:text-[#2848CC] font-bold text-base lg:text-lg tracking-wide transition-colors duration-300">Our Products</a>
            <a href="#contact" className="text-gray-600 hover:text-[#2848CC] font-bold text-base lg:text-lg tracking-wide transition-colors duration-300">Contact</a>
            
            <a 
              href={`https://wa.me/${typedData.storeInfo.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 bg-[#E60000] text-white px-6 py-3 rounded-full font-bold text-base lg:text-lg hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              WhatsApp Us
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-[#2848CC] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg font-bold text-gray-700 hover:text-[#2848CC] hover:bg-blue-50 rounded-md">About Us</a>
              <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg font-bold text-gray-700 hover:text-[#2848CC] hover:bg-blue-50 rounded-md">Our Products</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg font-bold text-gray-700 hover:text-[#2848CC] hover:bg-blue-50 rounded-md">Contact</a>
              <div className="pt-4 pb-2">
                <a 
                  href={`https://wa.me/${typedData.storeInfo.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#E60000] text-white px-5 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition shadow-md"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#2848CC] via-blue-700 to-[#1a2d80] text-white py-16 md:py-24 lg:py-36 relative overflow-hidden shadow-inner">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400 opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className={`text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Premium Electronics <br className="md:hidden" /> in Dubai
          </h1>
          <p className={`text-lg md:text-2xl mb-8 md:mb-10 max-w-2xl mx-auto text-blue-50 font-light px-2 transition-all duration-1000 ease-out delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Your trusted source for genuine laptops, mobiles, and tech accessories. Wholesale and retail.
          </p>
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 px-4 transition-all duration-1000 ease-out delay-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a href="#products" className="bg-[#E60000] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto">
              View Categories
            </a>
            <a href="#contact" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#2848CC] hover:scale-105 transition-all duration-300 w-full sm:w-auto">
              Visit Store
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-16 md:py-20 bg-white">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-[#E60000] inline-block pb-2">About Dadar Electronics</h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Dadar Electronics Trading LLC is a premier technology retailer based in the heart of Dubai. 
              We specialize in providing high-quality, genuine laptops and smartphones to both retail and wholesale customers. 
              With a commitment to excellent customer service and competitive pricing, we ensure you get the best tech solutions for your needs.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-[#2848CC] inline-block pb-2">
                Our Core Categories
              </h2>
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
                          <Image
                            key={imgIdx}
                            src={imgSrc}
                            alt="Premium Laptops Showcase"
                            fill
                            unoptimized
                            className={`object-cover transition-opacity duration-1000 ease-in-out ${imgIdx === activeLaptopIndex ? 'opacity-100' : 'opacity-0'}`}
                            sizes="(max-w-7xl) 50vw, 100vw"
                          />
                        ))
                      ) : (
                        <Image
                          src="/mobile1.png"
                          alt="Smartphones & Mobiles Showcase"
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-w-7xl) 50vw, 100vw"
                        />
                      )}
                      
                      <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-md uppercase z-20">
                        {category.icon} {category.id}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#2848CC] transition-colors duration-300">{category.name}</h3>
                    <p className="text-gray-500 mb-6 md:mb-8 leading-relaxed">{category.description}</p>
                  </div>

                  <a 
                    href={`https://wa.me/${typedData.storeInfo.whatsapp}?text=${encodeURIComponent(`Hello Dadar Electronics, I am interested in inquiring about availability and pricing for your ${category.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2848CC] font-bold inline-flex items-center group-hover:text-[#E60000] transition-colors mt-auto"
                  >
                    Inquire about stock 
                    <span className="ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </a>
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
              
              <a 
                href={`https://wa.me/${typedData.storeInfo.whatsapp}`}
                className="inline-block bg-[#2848CC] text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition w-full md:w-auto text-center"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#E60000]">Store Hours</h3>
              <ul className="space-y-3 text-gray-300">
                <li>Monday - Sunday: 10:00 AM - 10:00 PM</li>
                <li>Friday: 03:00 PM - 10:00 PM</li>
              </ul>
            </div>

          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Dadar Electronics Trading LLC. All rights reserved.
          </div>
        </ScrollReveal>
      </footer>

    </div>
  );
}