'use client';

import { useEffect, useState } from 'react';
import { Trash, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HistoriquePage() {
  const router = useRouter();
  const [user, setUser] = useState({ name: 'Anonyme', email: 'demo@email.com' });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) setUser(userData);
    const data = JSON.parse(localStorage.getItem('quizHistory')) || [];
    setHistory(data);
  }, []);

  const handleDelete = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
    localStorage.setItem('quizHistory', JSON.stringify(newHistory));
  };

  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem('quizHistory');
  };

  const bestScore = history.length ? Math.max(...history.map(h => h.score)) : 0;
  const worstScore = history.length ? Math.min(...history.map(h => h.score)) : 0;

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser({ name: 'Anonyme', email: 'demo@email.com' });
    router.push('/login');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-32">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-6xl md:text-6xl font-bold text-center">📈 Historique des Quiz</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>

      {history.length > 0 ? (
        <>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">Total : {history.length} participations</p>
            <button
              onClick={clearAll}
              className="text-red-600 text-sm border border-red-500 px-3 py-1 rounded hover:bg-red-50"
            >
              Supprimer tout
            </button>
          </div>

          <table className="w-full border text-sm shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 text-left">Nom</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Score</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.email}</td>
                  <td className="p-2">{item.score}/{item.total}</td>
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 bg-gray-100 p-4 rounded-md flex gap-8 justify-center">
            <p className="font-semibold text-green-700">🏆 Meilleur score : {bestScore}</p>
            <p className="font-semibold text-red-700">📉 Pire score : {worstScore}</p>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">Aucun historique disponible pour le moment.</p>
      )}
    </div>
  );
}
