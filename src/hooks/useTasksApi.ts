import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { Task } from '../types/Task';

/**
 * API Request Hook with React Query
 * @returns object[]
 */
export const useTasksApi = () => {
	const fetchTask = async () => {
		const response = await api.get('https://play-it-forward.azurewebsites.net//api/tasks/rand');

		return response.data;
	};

	return useQuery<Task>(['task'], fetchTask);
};
