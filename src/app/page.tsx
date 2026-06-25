"use client";

import Image from 'next/image';
import logo from '../../public/logo.jpg';
import { useState, useEffect } from 'react';
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

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger load animation once component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex justify-between items-center">
          
          {/* LOGO & BRAND NAME AREA */}
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            {/* Logo Image */}
            <Image 
              src={logo} 
              alt="Dadar Electronics Logo" 
              width={200}
              height={100}
              className="h-12 sm:h-14 md:h-20 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" 
              priority
            />
            
            {/* Animated Brand Text */}
            <div className={`flex flex-col justify-center transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight">
            Premium Electronics <br className="md:hidden" /> in Dubai
          </h1>
          <p className="text-lg md:text-2xl mb-8 md:mb-10 max-w-2xl mx-auto text-blue-50 font-light px-2">
            Your trusted source for genuine laptops, mobiles, and tech accessories. Wholesale and retail.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-[#E60000] inline-block pb-2">About Dadar Electronics</h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Dadar Electronics Trading LLC is a premier technology retailer based in the heart of Dubai. 
            We specialize in providing high-quality, genuine laptops and smartphones to both retail and wholesale customers. 
            With a commitment to excellent customer service and competitive pricing, we ensure you get the best tech solutions for your needs.
          </p>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-[#2848CC] inline-block pb-2">
              Our Core Categories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {typedData.categories.map((category) => (
              <div 
                key={category.id} 
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-5xl mb-5 md:mb-6">{category.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
                <p className="text-gray-500 mb-6 md:mb-8 leading-relaxed">{category.description}</p>
                <a href="#contact" className="text-[#2848CC] font-bold inline-flex items-center group-hover:text-[#E60000] transition-colors">
                  Inquire about stock →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-[#E60000]">Visit Us</h3>
            <p className="mb-2 text-gray-300"><strong>Address:</strong> {typedData.storeInfo.address}</p>
            <p className="mb-2 text-gray-300"><strong>Phone:</strong> {typedData.storeInfo.phone}</p>
            <p className="mb-8 text-gray-300"><strong>Email:</strong> {typedData.storeInfo.email}</p>
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
      </footer>
    </div>
  );
}