"use client";


import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TfiAlignLeft, TfiClose  } from "react-icons/tfi";
import { TfiArrowRight } from "react-icons/tfi";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
const [showModal, setShowModal] = useState(false);


  

  return (
    <nav className="bg-[#232122] text-lg font-[family-name:var(--font-geist-mono)] w-full fixed top-0 left-0 z-50">
  <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-2">
    <div className="flex justify-between h-16 items-center">
      {/* Logo */}
     
  <Image
    className="dark:invert"
    src="https://cdn.shopify.com/s/files/1/2423/6599/files/logolockup_sticker.png"
    alt="Logo"
    width={100}
    height={38}
    priority
    unoptimized
  />


      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 items-center">
        <Link href="/" className="text-white text-sm font-medium hover:text-white hover:underline hover:decoration-teal-500 underline-offset-4 transition duration-200">
Custom Product Feed 1
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/custom-product-feed-2" className="text-white text-sm font-medium hover:text-white hover:underline hover:decoration-teal-500 underline-offset-4 transition duration-200">Custom Product Feed 2
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/custom-product-feed-3" className="text-white text-sm font-medium hover:underline hover:decoration-teal-500 underline-offset-4 transition duration-200">
        
Custom Product Feed 3 
        <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        
        

        
      </div>
    

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-4xl text-white"
            onClick={() => setIsOpen(!isOpen)} aria-label="Open menu"
          >
            {isOpen ? <TfiClose />  : <TfiAlignLeft />}
          </button>
          
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4 pb-4 border-t h-screen justify-center px-4 bg-black">
          <Link href="/" className="text-white hover:text-black" onClick={() => setIsOpen(false)}>
Custom Product Feed 1</Link>
            <Link href="/custom-product-feed-2" className="text-white hover:text-black" onClick={() => setIsOpen(false)}>
Custom Product Feed 2 </Link>
            <Link href="/custom-product-feed-3" className="text-white hover:text-black" onClick={() => setIsOpen(false)}>
Custom Product Feed 3</Link>
            
          </div>
        )}
      </div>
    </nav>
  );
}
