// /app/layout.jsx
'use client';
import './globals.css';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Petite pause pour éviter le clignotement à l'initialisation
    setShow(true);
  }, []);

  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-800">
        <Navbar/>
        {show && (
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        )}
        <Footer/>
      </body>
    </html>
  );
}
