import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000'
});

/**
 * Axios interceptors are a feature provided by the Axios library that..
 * allows you to intercept and modify HTTP requests and responses globally within your application.
 */
api.interceptors.request.use(
	(config) => {
		const token = 'SUPER_SECURE_TOKEN';

		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

export default {
	post: (path = 'https://jsonplaceholder.typicode.com/todos/1') => api.post(path),
	get: (path = 'https://jsonplaceholder.typicode.com/users') => api.get(path)
};
