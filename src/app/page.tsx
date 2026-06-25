"use client";

import Image from 'next/image';
import logo from '../../public/logo.jpg';
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
      
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex justify-between items-center">
          
          {/* LOGO AREA - Fixed with Next.js Image component */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Image 
              src={logo} 
              alt="Dadar Electronics Logo" 
              width={200}
              height={100}
              className="h-16 md:h-24 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300" 
              priority
            />
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

      {/* Hero, About, Products, Footer remain as you had them... */}
      {/* (Rest of your original code remains exactly the same below here) */}
      
      {/* [HERO, ABOUT, PRODUCTS, FOOTER CODE GOES HERE] */}
      {/* (Keeping your original Hero, About, Products, and Footer sections as is for brevity) */}

    </div>
  );
}