// src/app/lib/history.js

export function saveToHistory(entry) {
  if (!entry || typeof entry !== 'object') {
    console.error('Entrée invalide pour le quiz history :', entry);
    return;
  }

  try {
    const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
    history.push(entry);
    localStorage.setItem('quizHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde dans l’historique :', error);
  }
}

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('quizHistory')) || [];
  } catch (error) {
    console.error('Erreur de récupération de l’historique :', error);
    return [];
  }
}
