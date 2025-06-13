import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-4xl md:text-5xl font-extrabold italic font-['Dancing_Script',cursive] bg-gradient-to-r from-purple-600 via-pink-400 to-orange-400 text-transparent bg-clip-text drop-shadow-lg tracking-wider select-none">
            AbohMovies
          </div>
          <div className="space-x-6 mt-4 md:mt-0">

            <Link href="/" className="hover:text-red-500 transition-colors duration-300">
              Accueil
            </Link>
            
            <Link href="/about" className="hover:text-red-500 transition-colors duration-300">
              A propos
            </Link>
            <Link href="/quiz" className="hover:text-red-500 transition-colors duration-300">
              Quiz
            </Link>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p>Email: abohwilfried91@gmail.com</p>
            <p>Téléphone: +237 690 55 82 16</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Liens Utiles</h3>
            <ul>
              <li>
                <Link href="/terms" className="hover:text-red-500 transition-colors duration-300">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-red-500 transition-colors duration-300">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Suivez-nous</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://youtube.com" target="_blank" className="hover:text-red-500 transition-colors duration-300">
                  Youtube
                </a>
              </li>
              <li>
                <a href="https://netflix.com" target="_blank" className="hover:text-red-500 transition-colors duration-300">
                  Netflix
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" className="hover:text-red-500 transition-colors duration-300">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <p>Inscrivez-vous pour recevoir les dernières nouvelles.</p>
            <form className="mt-2">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition-colors duration-300"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

    
        <div className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} MovieTime. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
