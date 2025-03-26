import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

const NavLinks = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10); // Change color after 50px scroll
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <HashLink 
                className={`px-4 font-extrabold transition-colors duration-500 ${scrolled ? "text-black hover:text-cyan-500" : "text-black-500 hover:text-cyan-500"}`} 
                to="/#Home"
            >
                Home
            </HashLink>
            <HashLink 
                className={`px-4 font-extrabold transition-colors duration-500 ${scrolled ? "text-black hover:text-cyan-500" : "text-black-500 hover:text-cyan-500"}`} 
                smooth to="/#about"
            >
                About
            </HashLink>
            <HashLink 
                className={`px-4 font-extrabold transition-colors duration-500 ${scrolled ? "text-black hover:text-cyan-500" : "text-black-500 hover:text-cyan-500"}`} 
                smooth to="/#portfolio"
            >
                Products
            </HashLink>
        
            <HashLink 
                className={`px-4 font-extrabold transition-colors duration-500 ${scrolled ? "text-black hover:text-cyan-500" : "text-black-500 hover:text-cyan-500"}`} 
                to="/contact#contact"
            >
                Contact Us
            </HashLink>
            <HashLink 
                className="text-white bg-cyan-500 hover:bg-teal-500 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl transition-all duration-300" 
                smooth to="/get-demo#demo"
            >
                Demo our products
            </HashLink>
        </>
    );
}

export default NavLinks;
