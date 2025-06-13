'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-4 py-4 bg-black/10 backdrop-blur-md shadow-md">
      <nav className="max-w-5xl mx-auto flex items-center justify-between rounded-full bg-white px-6 md:px-20 py-3 md:py-4 shadow-md">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl md:text-5xl font-extrabold italic font-['Dancing_Script',cursive] bg-gradient-to-r from-purple-600 via-pink-400 to-orange-400 text-transparent bg-clip-text drop-shadow-lg tracking-wider select-none"
        >
          AbohMovies
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center font-medium text-base">
          <li>
            <Link
              href="/"
              className={`text-gray-600 font-bold hover:text-red-500 transition-colors duration-200 ${
                pathname === '/' ? 'text-red-500' : ''
              }`}
            >
              Accueil
            </Link>
          </li>
           <li>
            <Link
              href="/about"
              className={`text-gray-600 font-bold hover:text-red-500 transition-colors duration-200 ${
                pathname === '/catalogue' ? 'text-red-500' : ''
              }`}
            >
              A propos
            </Link>
          </li>
          <li>
            <Link
              href="/catalogue"
              className={`text-gray-600 font-bold hover:text-red-500 transition-colors duration-200 ${
                pathname === '/catalogue' ? 'text-red-500' : ''
              }`}
            >
              Catalogue
            </Link>
          </li>
          <li>
            <Link
              href="/quiz"
              className={`text-gray-600 font-bold hover:text-red-500 transition-colors duration-200 ${
                pathname === '/quiz' ? 'text-red-500' : ''
              }`}
            >
              Le Quiz
            </Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <Link
            href="/contact"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center gap-2 text-base font-medium shadow-sm"
          >
            MoviesLearn <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Mobile Burger Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md rounded-b-xl px-6 py-4 space-y-4 max-w-5xl mx-auto mt-[-1px]">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block font-semibold ${
              pathname === '/' ? 'text-red-500' : 'text-gray-700'
            }`}
          >
            Accueil
          </Link>
          
          <Link
            href="/catalogue"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block font-semibold ${
              pathname === '/catalogue' ? 'text-red-500' : 'text-gray-700'
            }`}
          >
            Catalogue
          </Link>
          <Link
            href="/quiz"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block font-semibold ${
              pathname === '/quiz' ? 'text-red-500' : 'text-gray-700'
            }`}
          >
            Le Quiz
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-center font-medium mt-2"
          >
            MoviesLearn
          </Link>
        </div>
      )}
    </header>
  );
}
