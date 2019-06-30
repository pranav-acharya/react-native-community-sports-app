import client from './client';

export const login = async ({ email, password }) =>
  await client.post('/login', {
    email,
    password,
  });

export const signup = async ({ email, contact, password }) =>
  await client.post('/signup', {
    email,
    contact,
    password,
  });
