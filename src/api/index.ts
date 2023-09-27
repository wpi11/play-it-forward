import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000'
});

export type RequestStatus = 'idle' | 'start' | 'end' | 'error';

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

export default api;
