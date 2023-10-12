import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { Task } from '../types/Task';

const ENDPOINTS = {
	ALL_TASKS: 'https://play-it-forward.azurewebsites.net/api/tasks',
	RANDOM_TASK: 'https://play-it-forward.azurewebsites.net/api/tasks/rand'
};

/**
 * API Request Hook with React Query
 * @returns object[]
 */
export const useTasksApi = () => {
	const fetchTasks = async () => {
		const response = await api.get(ENDPOINTS.ALL_TASKS);

		// console.log('all tasks >>', response.data);

		return response.data;
	};

	return useQuery<Task>(['tasks'], fetchTasks);
};

export const useTask = () => {
	const fetchTask = async () => {
		const response = await api.get(ENDPOINTS.RANDOM_TASK);

		console.log('single task >>', response.data);

		return response.data;
	};

	return useQuery<Task>(['task'], fetchTask);
};
