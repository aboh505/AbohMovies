'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import films from '../data/films.json';
import { getFavoris, toggleFavori } from '../lib/favoris';
import { Heart } from 'lucide-react';
import { FaPlay, FaStar } from 'react-icons/fa';

export default function CataloguePage() {
  const [favorisList, setFavorisList] = useState([]);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [filteredFilms, setFilteredFilms] = useState(films);

  useEffect(() => {
    setFavorisList(getFavoris());
  }, []);

  useEffect(() => {
    const filtered = films.filter((film) => {
      const matchesTitle = film.title.toLowerCase().includes(search.toLowerCase());
      const matchesYear = yearFilter ? film.year === parseInt(yearFilter) : true;
      return matchesTitle && matchesYear;
    });
    setFilteredFilms(filtered);
  }, [search, yearFilter]);

  const handleFavori = (id, e) => {
    e.preventDefault();
    const updated = toggleFavori(id);
    setFavorisList(updated);
  };

  // Extraire les années uniques pour le menu déroulant
  const uniqueYears = [...new Set(films.map((film) => film.year))].sort((a, b) => b - a);

  return (

    
    <div className="max-w-8xl mx-auto p-6 mt-8">
       {/* Hero Section */}
            <section className="relative h-screen flex items-center bg-[url('/v1.jpg')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-900 before:via-gray-900/70 before:to-transparent">
              <div className="container mx-auto px-4 z-10">
                <div className="max-w-2xl">
                  <span className="inline-block bg-red-600 text-white text-sm px-3 py-1 rounded-full mb-4 animate-fadeIn">
                    Nouveauté
                  </span>
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeIn delay-100">
                    Mr WOLFF
                  </h1>
                  <div className="flex items-center text-yellow-400 mb-6 animate-fadeIn delay-200">
                    <FaStar className="mr-1" />
                    <span className="text-white ml-1">4.8/5</span>
                    <span className="text-gray-300 mx-3">|</span>
                    <span className="text-white">2024</span>
                    <span className="text-gray-300 mx-3">|</span>
                    <span className="text-white">2h46m</span>
                  </div>
                  <p className="text-gray-200 text-lg mb-8 animate-fadeIn delay-300">
                    Paul Atreides s'unit avec Chani et les Fremen pour mener la révolte contre ceux qui ont détruit sa famille. Faisant face à un choix entre l'amour de sa vie et le destin de l'univers, il doit empêcher un terrible futur que lui seul peut prévoir.
                  </p>
                  <div className="flex space-x-4 animate-fadeIn delay-500">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full flex items-center transition transform hover:scale-105">
                      <FaPlay className="mr-2" /> Regarder
                    </button>
                    <button className="bg-gray-800 bg-opacity-70 hover:bg-opacity-100 text-white px-8 py-3 rounded-full transition transform hover:scale-105">
                      Plus d'infos
                    </button>
                  </div>
                </div>
              </div>
            </section>
      
      <h1 className="text-5xl font-bold mb-7">🎬 Catalogue éducatif AbohMovies</h1>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <input
          type="text"
          placeholder=" Rechercher par titre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="p-3 border rounded w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">📅 Filtrer par année</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Catalogue */}
      {filteredFilms.length === 0 ? (
        <p>Aucun film trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredFilms.map((film) => (
            <Link key={film.id} href={`/catalogue/${film.id}`}>
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{film.title}</h2>
                  <button onClick={(e) => handleFavori(film.id, e)}>
                    <Heart
                      className="w-6 h-6"
                      fill={favorisList.includes(film.id) ? 'red' : 'none'}
                      color={favorisList.includes(film.id) ? 'red' : 'gray'}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-600">🎓 {film.theme} · {film.year}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
