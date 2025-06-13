// pages/film/[id].js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import films from '../../data/films.json';
import { getFavoris, toggleFavori } from '../../lib/favoris';
import { Heart, ChevronDown, ChevronUp, Trash2, Edit2, Check } from 'lucide-react';

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
    const foundFilm = films.find((f) => f.id == id);
    setFilm(foundFilm);
    setFavorisList(getFavoris());

    const savedComments = localStorage.getItem(`commentaires-film-${id}`);
    if (savedComments) {
      setCommentaires(JSON.parse(savedComments));
    } else {
      setCommentaires([
        { user: 'Utilisateur1', text: 'Film très inspirant, parfait pour une séance éducative.' },
        { user: 'CinéFan', text: 'J’ai adoré la performance des acteurs !' }
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
    if (commentaire.trim()) {
      setCommentaires([...commentaires, { user: currentUser, text: commentaire.trim() }]);
      setCommentaire('');
      setShowCommentaires(true);
    }
  };

  const handleDeleteComment = (index) => {
    const updated = commentaires.filter((_, i) => i !== index);
    setCommentaires(updated);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(commentaires[index].text);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingText('');
  };

  const saveEditing = () => {
    if (editingText.trim()) {
      const updated = [...commentaires];
      updated[editingIndex].text = editingText.trim();
      setCommentaires(updated);
      setEditingIndex(null);
      setEditingText('');
    }
  };

  const calculerMoyenne = () => {
    if (!film.reviews || film.reviews.length === 0) return 'N/A';
    const total = film.reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / film.reviews.length).toFixed(1);
  };

  if (!film) return <div className="text-center mt-10 text-xl">Chargement...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-28">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Image */}
        <div className="col-span-1">
          <img src={film.image} alt={film.title} className="rounded-xl w-full h-auto shadow-lg" />
        </div>

        {/* Détails du film */}
        <div className="col-span-2 space-y-6">
          <h1 className="text-4xl font-bold">{film.title}</h1>
          <p className="text-gray-600 text-lg">{film.theme} · {film.year}</p>

          {/* Description section */}
          <section className="text-black-800 leading-relaxed border-l-4 border-red-500 pl-4">
            {film.description}
          </section>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {film.genre?.map((g, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Bande-annonce */}
          {film.trailerId && (
            <div className="mt-4 rounded-lg overflow-hidden shadow-md">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${film.trailerId}`}
                title="Bande-annonce"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Favoris + note */}
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={handleFavori}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded text-sm transition"
              style={{ minWidth: '180px' }}
            >
              <Heart
                className="w-5 h-5"
                fill={favorisList.includes(film.id) ? 'white' : 'none'}
                color="white"
              />
              {favorisList.includes(film.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>
            <p className="text-lg font-semibold">
              ⭐ Note moyenne : <span className="text-red-600">{calculerMoyenne()}</span> / 5
            </p>
          </div>

          {/* Critiques */}
          {film.reviews && (
            <div>
              <h2 className="text-xl font-semibold mt-8 mb-3">Critiques</h2>
              <ul className="space-y-3">
                {film.reviews.map((r, i) => (
                  <li key={i} className="p-2 rounded">
                    <p className="font-semibold">{r.user}</p>
                    <p className="text-sm italic text-gray-600">⭐ {r.rating}</p>
                    <p>{r.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Commentaires utilisateur */}
          <div className="mt-8">
            <button
              onClick={() => setShowCommentaires(!showCommentaires)}
              className="flex items-center gap-2 text-red-500 hover:text-red-500 font-semibold"
            >
              {showCommentaires ? <ChevronUp /> : <ChevronDown />}
              {showCommentaires ? 'Masquer les commentaires' : 'Voir les commentaires utilisateurs'}
            </button>

            {showCommentaires && (
              <div className="mt-4 space-y-4">
                <ul className="space-y-2">
                  {commentaires.map((c, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <span className="font-medium">{c.user}</span> :{' '}
                        {editingIndex === idx ? (
                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="border-b border-red-500 focus:outline-none px-1"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEditing();
                              if (e.key === 'Escape') cancelEditing();
                            }}
                            autoFocus
                          />
                        ) : (
                          c.text
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        {editingIndex === idx ? (
                          <>
                            <button
                              onClick={saveEditing}
                              className="text-green-600 hover:text-green-800"
                              title="Valider la modification"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="text-gray-500 hover:text-gray-700"
                              title="Annuler"
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(idx)}
                              className="text-yellow-600 hover:text-yellow-800"
                              title="Modifier"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(idx)}
                              className="text-red-500 hover:text-red-700"
                              title="Supprimer"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Formulaire */}
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    className="flex-1 border px-4 py-2 rounded focus:outline-none focus:ring"
                    placeholder="Ajoutez un commentaire..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment();
                    }}
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
