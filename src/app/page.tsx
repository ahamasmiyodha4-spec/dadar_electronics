"use client";

import { useState } from 'react';
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
}

interface InventoryData {
  categories: Category[];
  storeInfo: StoreInfo;
}

const typedData = data as InventoryData;

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* HEADER - Upgraded for better proportions, larger logo, and styling */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex justify-between items-center">
          
          {/* LOGO AREA - Made larger with hover effect */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img 
              src="/dadar_electronics/logo.jpg" 
              alt="Dadar Electronics Logo" 
              style={{ maxHeight: '100px', width: 'auto' }}
              className="h-16 md:h-24 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300" 
            />
          </div>
          
          {/* Desktop Navigation - Enhanced Typography & Spacing */}
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

      {/* HERO SECTION - Responsive text sizes and padding */}
      <section className="bg-gradient-to-br from-[#2848CC] via-blue-700 to-[#1a2d80] text-white py-16 md:py-24 lg:py-36 relative overflow-hidden shadow-inner">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400 opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 drop-shadow-md leading-tight">
            Premium Electronics <br className="md:hidden" /> in Dubai
          </h1>
          <p className="text-lg md:text-2xl mb-8 md:mb-10 max-w-2xl mx-auto text-blue-50 font-light px-2">
            Your trusted source for genuine laptops, mobiles, and tech accessories. Wholesale and retail.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
            <a href="#products" className="bg-[#E60000] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/30 w-full sm:w-auto">
              View Categories
            </a>
            <a href="#contact" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#2848CC] hover:scale-105 transition-all duration-300 w-full sm:w-auto">
              Visit Store
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT US - Responsive padding */}
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
          {/* Grid inherently responsive: 1 column mobile, 2 columns desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {typedData.categories.map((category) => (
              <div 
                key={category.id} 
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E60000] to-[#2848CC] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <div className="text-5xl mb-5 md:mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
                <p className="text-gray-500 mb-6 md:mb-8 leading-relaxed">{category.description}</p>
                <a href="#contact" className="text-[#2848CC] font-bold inline-flex items-center group-hover:text-[#E60000] transition-colors">
                  Inquire about stock 
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center text-gray-500 text-xs md:text-sm px-4">
            * E-commerce store coming soon. Please contact us directly for current inventory and pricing.
          </div>
        </div>
      </section>

      {/* CONTACT & FOOTER */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          
          <div>
            <h3 className="text-2xl font-bold mb-6 text-[#E60000]">Visit Us</h3>
            <p className="mb-2 text-gray-300"><strong>Address:</strong> {typedData.storeInfo.address}</p>
            <p className="mb-2 text-gray-300"><strong>Phone:</strong> {typedData.storeInfo.phone}</p>
            <p className="mb-8 text-gray-300"><strong>Email:</strong> {typedData.storeInfo.email}</p>
            <a 
              href={`https://wa.me/${typedData.storeInfo.whatsapp}`}
              className="inline-block bg-[#2848CC] text-white px-8 py-4 md:px-6 md:py-3 rounded-lg md:rounded-md font-bold hover:bg-blue-700 transition w-full md:w-auto text-center"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-[#E60000]">Store Hours</h3>
            <ul className="space-y-3 md:space-y-2 text-gray-300">
              <li className="flex flex-col sm:flex-row justify-between border-b border-gray-700 pb-3 md:pb-2 gap-1">
                <span className="font-medium sm:font-normal">Monday - Saturday:</span> 
                <span>10:00 AM - 10:00 PM</span>
              </li>
              <li className="flex flex-col sm:flex-row justify-between pt-2 gap-1">
                <span className="font-medium sm:font-normal">Sunday:</span> 
                <span>Closed</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Dadar Electronics Trading LLC. All rights reserved.
        </div>
      </footer>

    </div>
  );
}