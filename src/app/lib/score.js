"use client"
import React from "react";

export function saveScore(filmId, score) {
  const scores = JSON.parse(localStorage.getItem('quizScores')) || {};
  scores[filmId] = score;
  localStorage.setItem('quizScores', JSON.stringify(scores));
}

export function getScore(filmId) {
  const scores = JSON.parse(localStorage.getItem('quizScores')) || {};
  return scores[filmId] || null;
}
