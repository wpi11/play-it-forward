import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const fetchPosts = async () => {
	const response = await api.get();

	return response.data;
};

export const useCachedApi = () => {
	return useQuery(['users'], fetchPosts);
};
