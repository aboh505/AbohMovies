'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
});

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen px-4 md:px-6 py-20 md:py-28 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Titre principal */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeIn()}
          className="text-4xl md:text-6xl font-bold text-red-500 mb-10 text-center"
        >
          À propos de MoviesLearn
        </motion.h1>

        {/* 🔴 Banniere défilante */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn(0.1)}
          className="overflow-hidden whitespace-nowrap border-y border-red-600 py-3 mb-10"
        >
          <div className="text-4xl animate-marquee text-center text-white-400 text-lg font-semibold tracking-wide">
            MoviesLearn utilise le pouvoir des films pour t’aider à apprendre, réfléchir et t’inspirer. Nos contenus sont soigneusement choisis pour allier éducation, émotion et divertissement. 🎬 Figures de l’ombre • Les évadés • Le cercle des poètes disparus • Les héritiers • Wonder • The Social Network • Interstellar • Invictus • À voix haute 🎓
          </div>
        </motion.div>

       

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeIn(0.3)}
          className="text-lg md:text-xl text-gray-300 text-center leading-relaxed max-w-3xl mx-auto mb-16"
        >
          MoviesLearn utilise le pouvoir des films pour t’aider à apprendre, réfléchir et t’inspirer. Nos contenus sont soigneusement choisis pour allier éducation, émotion et divertissement.
        </motion.p>

        {/* Vision + Image */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn(0.4)}
          className="grid md:grid-cols-2 gap-10 items-center mb-20"
        >
          <div>
            <h2 className="text-6xl font-semibold text-red-400 mb-4">🎯 Notre Vision</h2>
            <p className="text-5xl text-gray-300 text-lg leading-loose">
              Chaque film est une source d’inspiration. MoviesLearn veut transformer le visionnage en une véritable expérience éducative, accessible à tous.
            </p>
          </div>
          <Image
            src="/p1.jpg"
            alt="Vision CineLearn"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
        </motion.div>

        {/* Mission */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn(0.45)}
          className="mb-20"
        >
          <h2 className="text-6xl font-semibold text-red-400 mb-6 text-center">🚀 Notre Mission</h2>
          <p className="text-5xl text-gray-300 text-lg text-center max-w-4xl mx-auto">
            Inspirer, éduquer et éveiller les consciences à travers le cinéma. MoviesLearn souhaite démocratiser l’accès à la culture en rendant l’apprentissage vivant, accessible et engageant grâce à des films percutants accompagnés d’outils pédagogiques adaptés.
          </p>
        </motion.div>

        {/* 🧩 Cartes améliorées */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn(0.5)}
          className="mb-20"
        >
          <h2 className="text-3xl font-semibold text-red-400 mb-8 text-center">🧩 Ce que vous pouvez faire:</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Explorer des Films', desc: 'Découvre des films riches en contenu éducatif.', emoji: '🎬' },
              { title: 'Faire des Quiz', desc: 'Teste ta compréhension avec des questions sur les films.', emoji: '🧠' },
              { title: 'Suivre ton Parcours', desc: 'Un historique complet pour suivre ton évolution.', emoji: '📊' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-gray-900 to-black border border-red-600 p-6 rounded-xl transition transform hover:scale-105 shadow-lg"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition">
                  {item.emoji} {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
            {/* Vidéo */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn(0.2)}
          className="mb-16 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="w-full aspect-video">
            <iframe
              src="/a3.mp4"
              title="Vidéo d'introduction"
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </motion.div>

        {/* 🎓 Appel à l'action */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn(0.6)}
          className="text-center mt-20"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Prêt à apprendre autrement ?
          </h2>
          <p className="text-gray-400 mb-6">
            Rejoins CineLearn et transforme chaque moment de cinéma en moment de savoir.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition"
          >
            Explorer le Quiz
          </Link>
        </motion.div>
      </div>

      {/* 🔁 Style pour le défilement horizontal */}
      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </main>
  );
}
