'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import films from '../../data/films.json';
import { getFavoris, toggleFavori } from '../../lib/favoris';
import {
  Heart,
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit2,
  Check,
} from 'lucide-react';
import { FaArrowLeft } from 'react-icons/fa';

export default function FilmDetailPage({ currentUser = 'Moi' }) {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [favorisList, setFavorisList] = useState([]);
  const [commentaire, setCommentaire] = useState('');
  const [commentaires, setCommentaires] = useState([]);
  const [showCommentaires, setShowCommentaires] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    const found = films.find((f) => f.id == id);
    setFilm(found);
    setFavorisList(getFavoris());
    const saved = localStorage.getItem(`commentaires-film-${id}`);
    if (saved) {
      setCommentaires(JSON.parse(saved));
    } else {
      setCommentaires([
        { user: 'CinéFan', text: 'Film très inspirant, parfait pour une séance éducative.' },
        { user: 'CinéFan', text: 'J’ai adoré la performance des acteurs !' },
      ]);
    }
  }, [id]);

  useEffect(() => {
    if (film) {
      localStorage.setItem(`commentaires-film-${film.id}`, JSON.stringify(commentaires));
    }
  }, [commentaires, film]);

  const handleFavori = () => {
    const updated = toggleFavori(film.id);
    setFavorisList(updated);
  };

  const handleAddComment = () => {
    if (!commentaire.trim()) return;
    setCommentaires([...commentaires, { user: currentUser, text: commentaire.trim() }]);
    setCommentaire('');
    setShowCommentaires(true);
  };

  const handleDeleteComment = (i) => {
    setCommentaires(commentaires.filter((_, idx) => idx !== i));
  };

  const startEditing = (i) => {
    setEditingIndex(i);
    setEditingText(commentaires[i].text);
  };
  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingText('');
  };
  const saveEditing = () => {
    if (!editingText.trim()) return;
    const updated = [...commentaires];
    updated[editingIndex].text = editingText.trim();
    setCommentaires(updated);
    cancelEditing();
  };

  const calcMoyenne = () => {
    if (!film?.reviews?.length) return 'N/A';
    const total = film.reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / film.reviews.length).toFixed(1);
  };

  if (!film) {
    return <div className="text-center mt-10 text-xl">Chargement…</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10">
      {/* ← Retour */}
      <div className="mb-6">
        <Link
          href="/catalogue"
          className="mt-20 inline-flex items-center gap-2 text-black-600 hover:text-black-800 font-semibold"
        >
          <FaArrowLeft className="w-5 h-5" /> Retour au catalogue
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Image */}
        <div>
          <img
            src={film.image}
            alt={film.title}
            className="rounded-xl w-full shadow-lg"
          />
        </div>

        {/* Détails */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-4xl font-bold">{film.title}</h1>
          <p className="text-gray-600">{film.theme} · {film.year}</p>

          <section className="border-l-4 border-red-500 pl-4 text-gray-800">
            {film.description}
          </section>

          <div className="flex flex-wrap gap-2">
            {film.genre?.map((g, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {g}
              </span>
            ))}
          </div>

          {film.trailerId && (
            <div className="mt-4 overflow-hidden rounded-lg shadow-md">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${film.trailerId}`}
                title="Bande-annonce"
                allowFullScreen
              />
            </div>
          )}

          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={handleFavori}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
            >
              <Heart
                className="w-5 h-5"
                fill={favorisList.includes(film.id) ? 'white' : 'none'}
              />
              {favorisList.includes(film.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>
            <p className="text-lg font-semibold">
              ⭐ Note moyenne : <span className="text-red-600">{calcMoyenne()}</span> / 5
            </p>
          </div>

          {/* Critiques */}
          {film.reviews && (
            <div>
              <h2 className="text-xl font-semibold mt-8 mb-3">Critiques</h2>
              <ul className="space-y-3">
                {film.reviews.map((r, i) => (
                  <li key={i} className="p-2 bg-gray-100 rounded">
                    <p className="font-semibold">{r.user}</p>
                    <p className="italic text-gray-600">⭐ {r.rating}</p>
                    <p>{r.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Commentaires Utilisateurs */}
          <div className="mt-8">
            <button
              onClick={() => setShowCommentaires(!showCommentaires)}
              className="flex items-center gap-2 text-red-500 font-semibold"
            >
              {showCommentaires ? <ChevronUp /> : <ChevronDown />}
              {showCommentaires ? 'Masquer commentaires' : 'Voir commentaires'}
            </button>

            {showCommentaires && (
              <div className="mt-4 space-y-4">
                <ul className="space-y-2">
                  {commentaires.map((c, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <div className="flex-1">
                        <span className="font-medium">{c.user}</span> :{' '}
                        {editingIndex === idx ? (
                          <input
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEditing();
                              if (e.key === 'Escape') cancelEditing();
                            }}
                            className="border-b border-red-500 focus:outline-none px-1"
                            autoFocus
                          />
                        ) : (
                          c.text
                        )}
                      </div>
                      <div className="flex gap-2">
                        {editingIndex === idx ? (
                          <>
                            <button onClick={saveEditing} className="text-green-600">
                              <Check size={18} />
                            </button>
                            <button onClick={cancelEditing} className="text-gray-500">
                              ✕
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEditing(idx)} className="text-yellow-600">
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDeleteComment(idx)} className="text-red-500">
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Formulaire Commentaire */}
                <div className="flex gap-2 mt-3">
                  <input
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    className="flex-1 border px-4 py-2 rounded focus:outline-none"
                    placeholder="Ajoutez un commentaire…"
                  />
                  <button
                    onClick={handleAddComment}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
