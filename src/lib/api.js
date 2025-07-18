// src/lib/api.js
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

async function request(path, { method = 'GET', data, headers = {}, ...rest } = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}${path}`, config);
    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      result = text;
    }
    if (!response.ok) {
      throw new Error(result?.message || 'حدث خطأ في الاتصال بالخادم');
    }
    return result;
  } catch (error) {
    throw error;
  }
}

const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, data, options) => request(path, { ...options, method: 'POST', data }),
  put: (path, data, options) => request(path, { ...options, method: 'PUT', data }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};

export default api;
