'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import films from '../data/films.json';
import { saveToHistory } from '../lib/history';

export default function QuizPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const allQuestions = films.flatMap(f =>
    f.quiz.map(q => ({ ...q, filmTitle: f.title, filmId: f.id }))
  );
  const currentQuestion = allQuestions[currentIndex];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.name && storedUser.email) {
      setUser(storedUser);
      setTimeout(() => setShowWelcome(false), 3000);
    } else {
      router.push('/login');
    }
  }, []);

  const handleSelect = (choice) => {
    setSelectedAnswer(choice);
    if (choice === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
    setShowNext(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowNext(false);
    if (currentIndex + 1 < allQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        confetti();
        setLoading(false);
        setFinished(true);
        const result = {
          name: user.name,
          email: user.email,
          score,
          total: allQuestions.length,
          date: new Date().toLocaleString(),
        };
        saveToHistory(result);
      }, 1500);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 mt-32 relative">
      {showWelcome && (
        <div className="fixed inset-0 bg-black text-white flex flex-col justify-center items-center z-50 text-center p-6">
          <h1 className="text-6xl font-bold mb-4">🎬 Bienvenue {user.name} !</h1>
          <p className="text-2xl">Prépare-toi à tester tes connaissances cinématographiques !</p>
        </div>
      )}

      {!finished && !showWelcome && (
        <>
          <div className="mb-10 text-center">
            <h1 className="text-6xl font-bold text-red-600 mb-2">🧠 Quiz MoviesLearn</h1>
            <p className="text-gray-600">Réponds sans stress – les réponses sont anonymes !</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Question {currentIndex + 1} sur {allQuestions.length}
            </h2>

            <p className="text-lg font-medium mb-4">
              🎬 Dans <span className="text-1xl text-black-600 font-bold">{currentQuestion.filmTitle}</span> :<br />
              {currentQuestion.question}
            </p>

            <div className="space-y-3">
              {currentQuestion.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(choice)}
                  disabled={selectedAnswer !== null}
                  className={`block w-full text-left px-4 py-2 rounded border ${
                    selectedAnswer !== null
                      ? 'bg-gray-100 cursor-not-allowed'
                      : 'hover:bg-blue-50 border-gray-300'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>

            {showNext && (
              <div className="mt-6 text-right">
                <button
                  onClick={handleNext}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Suivant →
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {loading && (
        <div className="text-center text-blue-600 font-semibold">
          Chargement du score...
        </div>
      )}

      {finished && (
        <div className="text-center">
          <h2 className="text-7xl font-bold text-green-700 mb-2">🎉 Quiz terminé !</h2>
          <p className="text-2xl mb-4">
            Tu as obtenu <span className="font-bold">{score} / {allQuestions.length}</span>
          </p>
          <button
            onClick={() => router.push('/historique')}
            className="text-xl bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Voir l'historique
          </button>
        </div>
      )}
    </div>
  );
}
