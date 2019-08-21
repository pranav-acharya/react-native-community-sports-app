export const USE_MOCK_API = true; // s
const MOCK_API_TIMEOUT = 1000; // ms

export const delayedPromise = data => new Promise((resolve) => {
  setTimeout(() => resolve(data), MOCK_API_TIMEOUT);
});
