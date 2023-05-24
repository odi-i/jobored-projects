import axios from 'axios';
import { API_PATH, DATA, SERVER_PATH } from '../constValues';

const $api = axios.create({
  baseURL: SERVER_PATH,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization =
    `Bearer ` +
    JSON.parse(localStorage.getItem('access_token') || '{}').access_token;
  config.headers['Content-Type'] = 'application/json';
  config.headers['x-secret-key'] = DATA.secretKey;
  config.headers['X-Api-App-Id'] = DATA.appId;
  return config;
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(SERVER_PATH + API_PATH.authorization, {
          headers: {
            'Content-Type': 'application/json',
            'x-secret-key': DATA.secretKey,
            'X-Api-App-Id': DATA.appId,
          },
        });
        localStorage.setItem(
          DATA.localeAuth,
          JSON.stringify({
            access_token: response.data.access_token,
            ttl: response.data.ttl,
          })
        );
        return $api.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    throw error;
  }
);

export default $api;
