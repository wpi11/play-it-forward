import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useUsersApi = () => {
	const fetchUsers = async () => {
		const response = await api.get('https://jsonplaceholder.typicode.com/users');

		return response.data;
	};

	return useQuery(['users'], fetchUsers);
};
