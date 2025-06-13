// lib/auth.js

export function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error('Tous les champs sont obligatoires.');
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    throw new Error("Cet email est déjà enregistré.");
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify({ name, email }));
}

export function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error('Veuillez remplir tous les champs.');
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const matchedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!matchedUser) {
    throw new Error("Email ou mot de passe incorrect.");
  }

  localStorage.setItem('user', JSON.stringify({ name: matchedUser.name, email }));
}

export function logoutUser() {
  localStorage.removeItem('user');
}

export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
