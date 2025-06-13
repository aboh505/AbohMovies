"use client";

import { useRef } from "react";
import Head from "next/head";
import { FaPlay, FaChevronRight, FaChevronLeft, FaStar } from "react-icons/fa";
import Link from "next/link";

function Carousel({ items, renderItem, refProp }) {
  const scrollAmount = 600;

  const scroll = (direction) => {
    if (refProp.current) {
      refProp.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <div
        ref={refProp}
        className="flex overflow-x-auto scrollbar-hide space-x-6 pb-8"
      >
        {items.map(renderItem)}
      </div>
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-100 transition z-10 ml-2"
        aria-label="Défiler vers la gauche"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-100 transition z-10 mr-2"
        aria-label="Défiler vers la droite"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default function Page() {
  const trendingRef = useRef(null);
  const upcomingRef = useRef(null);
  const classicsRef = useRef(null);
  const trailersRef = useRef(null);
  const newsRef = useRef(null);

  // Données
  const trendingMovies = [
    {
      id: 1,
      year: 2024,
      rating: 4.8,
      image: "/a1.jpg",
      genre: "Sci-Fi",
    },
    {
      id: 2,
   
      year: 2024,
      rating: 4.8,
      image: "/a2.jpg",
      genre: "Sci-Fi",
    },
    {
      id: 3,
    
      year: 2024,
      rating: 4.8,
      image: "/a3.jpg",
      genre: "Sci-Fi",
    },
    {
      id: 4,
   
      year: 2024,
      rating: 4.8,
      image: "/a4.jpg",
      genre: "Sci-Fi",
    },
    {
      id: 5,
   
      year: 2024,
      rating: 4.8,
      image: "/c1.jpg",
      genre: "Sci-Fi",
    },
    {
      id: 6,
     
      year: 2024,
      rating: 4.8,
      image: "/c2.jpg",
      genre: "Sci-Fi",
    },
    {
      id: 7,
     
      year: 2024,
      rating: 4.8,
      image: "/c3.jpg",
      genre: "Sci-Fi",
    },
   
   
    // autres films...
  ];

  const upcomingMovies = [
    {
      id: 8,
     
      year: 2024,
      image: "/d1.jpg",
      genre: "Action",
      releaseDate: "Mai 2024",
    },
    {
      id: 9,
   
      year: 2024,
      image: "/d2.jpg",
      genre: "Action",
      releaseDate: "Mai 2024",
    },
    {
      id: 10,
    
      year: 2024,
      image: "/d3.jpg",
      genre: "Action",
      releaseDate: "Mai 2024",
    },
    {
      id: 11,
     
      year: 2024,
      image: "/d4.jpg",
      genre: "Action",
      releaseDate: "Mai 2024",
    },
    {
      id: 12,
   
      year: 2024,
      image: "/h1.jpg",
      genre: "Action",
      releaseDate: "Mai 2024",
    },
    {
      id: 13,
    
      year: 2024,
      image: "/h2.jpg",
      genre: "Action",
      releaseDate: "Mai 2024",
    },
    {
      id: 14,
   
      year: 2024,
      image: "/h3.jpg",
      genre: "Action",
      releaseDate: "Mai 2024",
    },
   //autres films...
  ];

  const classicMovies = [
    {
      id: 15,
   
      year: 1972,
      rating: 4.9,
      image: "/f1.jpg",
      genre: "Crime",
      director: "Francis Ford Coppola",
    },
    {
      id: 16,
    
      year: 1972,
      rating: 4.9,
      image: "/f2.jpg",
      genre: "Crime",
      director: "Francis Ford Coppola",
    },
    {
      id: 17,
    
      year: 1972,
      rating: 4.9,
      image: "/f3.jpg",
      genre: "Crime",
      director: "Francis Ford Coppola",
    },
    {
      id: 18,
     
      year: 1972,
      rating: 4.9,
      image: "/f4.jpg",
      genre: "Crime",
      director: "Francis Ford Coppola",
    },
    {
      id: 19,
    
      year: 1972,
      rating: 4.9,
      image: "/f5.jpg",
      genre: "Crime",
      director: "Francis Ford Coppola",
    },
    {
      id: 20,
    
      year: 1972,
      rating: 4.9,
      image: "/f6.jpg",
      genre: "Crime",
      director: "Francis Ford Coppola",
    },
    {
      id: 21,
     
      year: 1972,
      rating: 4.9,
      image: "/f7.jpg",
      genre: "Crime",
      director: "Francis Ford Coppola",
    },

    {
      id: 22,
    
      year: 1972,
      rating: 4.9,
      image: "/f8.jpg",
      genre: "Crime",
      director: "Francis Ford Coppola",
    },
   
    // autres classiques...
  ];

  const trailerVideos = [
    {
      id: 23,
      title: "Marie Curie (Radioactive)",
      thumbnail: "/f9.jpg",
      views: "25M",
      duration: "1:35",
      videoUrl: "https://musee.curie.fr", // mettre l'URL youtube ou vidéo ici
    },
    {
      id: 24,
      title: "À la recherche du bonheur",
      thumbnail: "/f10.jpg",
      views: "20M",
      duration: "1:35",
      videoUrl: "https://www.insee.fr", // mettre l'URL youtube ou vidéo ici
    },
    {
      id: 25,
      title: "Malala : Le droit des filles",
      thumbnail: "/f11.jpg",
      views: "15M",
      duration: "3:05",
      videoUrl: "https://www.unicef.org/fr/education", // mettre l'URL youtube ou vidéo ici
    },
    {
      id: 26,
      title: " The Boy Who Harnessed the Wind",
      thumbnail: "/f12.jpg",
      views: "22M",
      duration: "2:55",
      videoUrl: "https://www.edf.fr", // mettre l'URL youtube ou vidéo ici
    },
    {
      id: 27,
      title: "Good Will Hunting ",
      thumbnail: "/f13.jpg",
      views: "20M",
      duration: "2:35",
      videoUrl: "https://lejournal.cnrs.fr", // mettre l'URL youtube ou vidéo ici
    },
    {
      id: 28,
      title: "Mandela: Un long chemin vers la liberté",
      thumbnail: "/f14.jpg",
      views: "25k",
      duration: "3:20",
      videoUrl: "https://www.un.org/fr/events/mandeladay", // mettre l'URL youtube ou vidéo ici
    },
    {
      id: 29,
      title: "Le jeu de la dame (The Queen’s Gambit)",
      thumbnail: "/f15.jpg",
      views: "30k",
      duration: "1:45",
      videoUrl: "https://www.fide.com", // mettre l'URL youtube ou vidéo ici
    }, {
      id: 30,
      title: " La vie est belle",
      thumbnail: "/f16.jpg",
      views: "40M",
      duration: "2:50",
      videoUrl: "https://www.fondationshoah.org", // mettre l'URL youtube ou vidéo ici
    }, {
      id: 31,
      title: "Spotlight",
      thumbnail: "/f17.jpg",
      views: "6M",
      duration: "1:25",
      videoUrl: "https://rsf.org", // mettre l'URL youtube ou vidéo ici
    }, {
      id: 32,
      title: "Chernobyl (mini-série)",
      thumbnail: "/f18.jpg",
      views: "2M",
      duration: "2:35",
      videoUrl: "https://www.irsn.fr", // mettre l'URL youtube ou vidéo ici
    },

    // autres trailers...
  ];

  const newsArticles = [
    {
      id: 33,
      title: "Christopher Nolan annonce son nouveau projet",
      excerpt:
        "Le réalisateur primé prépare un nouveau film qui promet de repousser les limites du cinéma...",
      image: "/m1.jpg",
      date: "15 mars 2024",
      author: "Jean Dupont",
    },
    {
      id: 34,
      title: "Christopher Nolan annonce son nouveau projet",
      excerpt:
        "Le réalisateur primé prépare un nouveau film qui promet de repousser les limites du cinéma...",
      image: "/m3.jpg",
      date: "15 mars 2024",
      author: "Jean Dupont",
    },

    {
      id: 35,
      title: "Christopher Nolan annonce son nouveau projet",
      excerpt:
        "Le réalisateur primé prépare un nouveau film qui promet de repousser les limites du cinéma...",
      image: "/m1.jpg",
      date: "15 mars 2024",
      author: "Jean Dupont",
    },

    {
      id: 36,
      title: "Christopher Nolan annonce son nouveau projet",
      excerpt:
        "Le réalisateur primé prépare un nouveau film qui promet de repousser les limites du cinéma...",
      image: "/m1.jpg",
      date: "15 mars 2024",
      author: "Jean Dupont",
    },
    {
      id: 37,
      title: "Christopher Nolan annonce son nouveau projet",
      excerpt:
        "Le réalisateur primé prépare un nouveau film qui promet de repousser les limites du cinéma...",
      image: "/m1.jpg",
      date: "15 mars 2024",
      author: "Jean Dupont",
    },
    {
      id: 38,
      title: "Christopher Nolan annonce son nouveau projet",
      excerpt:
        "Le réalisateur primé prépare un nouveau film qui promet de repousser les limites du cinéma...",
      image: "/m3.jpg",
      date: "15 mars 2024",
      author: "Jean Dupont",
    },

    {
      id: 39,
      title: "Christopher Nolan annonce son nouveau projet",
      excerpt:
        "Le réalisateur primé prépare un nouveau film qui promet de repousser les limites du cinéma...",
      image: "/m3.jpg",
      date: "15 mars 2024",
      author: "Jean Dupont",
    },

    {
      id: 40,
      title: "Christopher Nolan annonce son nouveau projet",
      excerpt:
        "Le réalisateur primé prépare un nouveau film qui promet de repousser les limites du cinéma...",
      image: "/m3.jpg",
      date: "15 mars 2024",
      author: "Jean Dupont",
    },
    {
      id: 41,
      title: "Christopher Nolan annonce son nouveau projet",
      excerpt:
        "Le réalisateur primé prépare un nouveau film qui promet de repousser les limites du cinéma...",
      image: "/m1.jpg",
      date: "15 mars 2024",
      author: "Jean Dupont",
    },
   
    // autres articles...
  ];

  // Renderers
  const renderMovieItem = (movie) => (
    <div
      key={movie.id}
      className="flex-shrink-0 w-64 group transition transform hover:scale-105"
    >
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white text-xl font-bold">{movie.title}</h3>
          {movie.rating && (
            <div className="flex items-center text-yellow-400 mt-1">
              <FaStar className="mr-1" />
              <span className="text-white ml-1">{movie.rating}/5</span>
            </div>
          )}
          <div className="text-gray-300 mt-1">
            {movie.year} • {movie.genre}
          </div>
          <Link href={'https://www.netflix.com'} className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm w-full transition">
            Voir plus
          </Link>
        </div>
      </div>
    </div>
  );

  const renderUpcomingItem = (movie) => (
    <div key={movie.id} className="flex-shrink-0 w-64 group">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white text-xl font-bold">{movie.title}</h3>
          <div className="text-gray-300 mt-1">
            {movie.releaseDate} • {movie.genre}
          </div>
          <button className="mt-3 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm w-full transition">
            Notifier moi
          </button>
        </div>
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
          Bientôt
        </div>
      </div>
    </div>
  );

  const renderClassicItem = (movie) => (
    <div
      key={movie.id}
      className="flex-shrink-0 w-64 group transition transform hover:scale-105"
    >
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white text-xl font-bold">{movie.title}</h3>
          <div className="flex items-center text-yellow-400 mt-1">
            <FaStar className="mr-1" />
            <span className="text-white ml-1">{movie.rating}/5</span>
          </div>
          <div className="text-gray-300 mt-1">{movie.year} • {movie.genre}</div>
          <div className="text-gray-400 text-sm mt-1">
            Réalisé par {movie.director}
          </div>
          <Link href={'/catalogue'} className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm w-full transition">
            Voir plus
          </Link>
        </div>
      </div>
    </div>
  );

  const renderTrailerItem = (video) => (
    <a
      key={video.id}
      href={video.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-64 group cursor-pointer"
      title={`Voir la bande-annonce de ${video.title}`}
    >
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-36 object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center opacity-80 hover:opacity-100 transition">
          <FaPlay className="text-white text-4xl" />
        </div>
      </div>
      <h4 className="text-white mt-2 font-semibold">{video.title}</h4>
      <div className="text-gray-400 text-sm">
        {video.views} vues • {video.duration}
      </div>
    </a>
  );

  const renderNewsItem = (article) => (
    <div key={article.id} className="flex-shrink-0 w-80 group">
      <div className="rounded-lg overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 bg-gray-800">
          <h4 className="text-white font-bold mb-2">{article.title}</h4>
          <p className="text-gray-300 text-sm mb-2">{article.excerpt}</p>
          <div className="text-gray-400 text-xs">
            {article.date} — {article.author}
          </div>
          <Link href={'https://www.superpouvoir.com/'} className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm w-full transition">
            Lire l'article
          </Link>
        </div>
      </div>
    </div>
  );

  // Fonction pour scroller vers la section bandes-annonces
  const scrollToTrailers = () => {
    if (trailersRef.current) {
      trailersRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>Site Cinéma Modernisé</title>
        <meta
          name="description"
          content="Site cinéma avec sections personnalisées et bande-annonce"
        />
      </Head>

      <main className="bg-black min-h-screen text-white p-8 space-y-16">
        {/* Bannière Hero */}
        <section
          className="relative rounded-lg overflow-hidden h-[500px] flex items-end p-8"
          style={{
            backgroundImage: `url(/m2.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-gradient-to-t from-black via-transparent to-transparent p-6 rounded-lg max-w-xl">
            <h1 className="text-5xl font-bold mb-4">Dune: Part Two</h1>
            <p className="mb-6 max-w-md">
              Le très attendu second volet de la saga épique de science-fiction,
              réalisé par Denis Villeneuve.
            </p>
            <button
              onClick={scrollToTrailers}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-3"
            >
              <FaPlay /> Voir la bande-annonce
            </button>
          </div>
        </section>

        {/* Sections carrousels */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Tendances</h2>
          <Carousel
            items={trendingMovies}
            renderItem={renderMovieItem}
            refProp={trendingRef}
          />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Sorties à venir</h2>
          <Carousel
            items={upcomingMovies}
            renderItem={renderUpcomingItem}
            refProp={upcomingRef}
          />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Classiques</h2>
          <Carousel
            items={classicMovies}
            renderItem={renderClassicItem}
            refProp={classicsRef}
          />
        </section>

        {/* Section Bandes-annonces */}
        <section ref={trailersRef}>
          <h2 className="text-3xl font-bold mb-6">Bandes-annonces</h2>
          <Carousel
            items={trailerVideos}
            renderItem={renderTrailerItem}
            refProp={trailersRef}
          />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Actualités</h2>
          <Carousel items={newsArticles} renderItem={renderNewsItem} refProp={newsRef} />
        </section>
      </main>
    </>
  );
}
