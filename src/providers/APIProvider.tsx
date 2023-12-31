import React, { ReactNode, createContext, useContext } from 'react';
import { createCompletion, OPENAI_PROPS } from '../lib/OpenAI';
import { useTasksApi } from '../hooks';
import { Task } from '../types/Task';

type APIProviderProps = {
	children: ReactNode;
};

type APIContextType = {
	tasks?: Task[];
	refetchTasks?: () => void;
	createCompletion?: ({
		model,
		prompt,
		temperature,
		max_tokens
	}: OPENAI_PROPS) => Promise<{ data: string }>;
};

/**
 * API Context instantiation with defaults
 */
const APIContext = createContext<APIContextType>({
	tasks: undefined,
	createCompletion
});

/**
 * Exposed hook to retrieve cached API request data
 */
export const useAPIProvider = () => useContext<APIContextType>(APIContext);

/**
 * API Request Provider encapsulates and caches API Requests
 * @summary
 * this simply demonstrates how you can fetch a request, cache the results and..
 * have global access to the request results
 */
export function APIProvider({ children }: APIProviderProps) {
	/**
	 * Custom Transtack Query / API hook
	 * - Caches results from api requests
	 * - Requires: QueryClientProvider to be the parent of this component
	 */
	const { data: tasks, refetch: refetchTasks } = useTasksApi();

	// object available with the usage of useAPIProvider hook
	const state = {
		tasks,
		refetchTasks,
		createCompletion
	} as APIContextType;

	return <APIContext.Provider value={state}>{children}</APIContext.Provider>;
}
