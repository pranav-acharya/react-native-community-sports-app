import api from './client';
import { USE_MOCK_API, delayedPromise } from './config';

// Login
export const login = ({ type, username, password }) => {
  if (USE_MOCK_API) { return delayedPromise({ data: { userId: username, token: '' }, status: 200 }); }
  const selectedType = type || 'EMAIL';
  return api.post('/v1/authenticate', { type: selectedType, username, password });
};

export const signup = ({ type, username, password }) => {
  if (USE_MOCK_API) { return delayedPromise({}); }
  const selectedType = type || 'EMAIL';
  return api.post('/v1/register', { type: selectedType, username, password, status: 200 });
};

export const verify = (code) => {
  if (USE_MOCK_API) { return delayedPromise({}); }
  return api.post(`/v1/verify/${code}`);
};

export const forgotPassword = (username) => {
  if (USE_MOCK_API) { return delayedPromise({}); }
  return api.post(`/v1/forgot_password/${username}`);
};

// logged in user wants to reset his password
export const resetPassword = ({ userId, newPassword, oldPassword, accessToken }) => {
  if (USE_MOCK_API) { return delayedPromise({}); }
  return api.post('/v1/resetPassword/', {
    user_id: userId,
    new_password: newPassword,
    old_password: oldPassword,
    access_token: accessToken
  });
};
