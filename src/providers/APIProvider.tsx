import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import { useUsersApi } from '../hooks';
import { createCompletion, OPENAI_PROPS } from '../modules/OpenAI';

type APIProviderProps = {
	children: ReactNode;
};

type APIContextType = {
	users: [];
	createCompletion: ({
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
	users: [],
	createCompletion
});

/**
 * Exposed hook to retrieve cached API request data
 */
export const useAPIProvider = (): APIContextType => useContext(APIContext);

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
	const { data: users, refetch: refetchUsers } = useUsersApi();

	// object available with the usage of useAPIProvider hook
	const state = {
		users,
		refetchUsers,
		createCompletion
	};

	return <APIContext.Provider value={state}>{children}</APIContext.Provider>;
}
