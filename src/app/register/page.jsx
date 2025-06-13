'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../lib/auth'; // Assure-toi que ce chemin est correct

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      registerUser(form);
      router.push('/login'); // Redirige vers la page quiz après inscription
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Inscription</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              className="w-full p-2 border rounded pr-10"
              required
            />
            <div
              className="absolute right-3 top-2.5 cursor-pointer"
              onClick={() => setShowPwd(!showPwd)}
            >
              {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          <button className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
            S’inscrire
          </button>
        </form>
        <p className="font-bold text-sm text-center">
          Déjà inscrit ?{' '}
          <a href="/login" className="text-indigo-600 underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}
