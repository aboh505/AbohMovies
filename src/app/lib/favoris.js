"use client";
import React from 'react';
export function getFavoris() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('favoris')) || [];
}

export function toggleFavori(id) {
  const favoris = getFavoris();
  const updated = favoris.includes(id)
    ? favoris.filter(f => f !== id)
    : [...favoris, id];
  localStorage.setItem('favoris', JSON.stringify(updated));
  return updated;
}

export function isFavori(id) {
  if (typeof window === 'undefined') return false;
  return getFavoris().includes(id);
}
