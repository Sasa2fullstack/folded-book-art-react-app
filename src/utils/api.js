import axios from 'axios';

export const USER_TOKEN_KEY = 'USER-TOKEN';
export const AUTHORIZATION_HEADER = 'Authorization';

export function getBaseURL () {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  return apiEndpoint;
}

export function getAccessToken () {
  const accessToken = localStorage.getItem(USER_TOKEN_KEY);
  return accessToken;
}

export function setAccessToken (token) {
  localStorage.setItem(USER_TOKEN_KEY, token);
}

export const client = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000,
  method: 'GET',
});

function jsonConfig(config) {
  config.headers = {
    ...config.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return config;
}

// eslint-disable-next-line no-unused-vars
function authConfig(config) {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${getAccessToken()}`,
  };
  return config;
}

function request(config) {
  if (config.data) {
    jsonConfig(config);
  }

  return client.request(config);
}

export function getTestData() {
  return request({ url: '/repos/facebook/create-react-app' });
}
