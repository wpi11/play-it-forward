import React from 'react';
import { Platform } from 'react-native';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { registerRootComponent } from 'expo';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from './App';
import { ThemeProvider, APIProvider } from './providers';

/**
 * Conditionally render platform specific logic
 */
if (Platform.OS === 'ios') {
	/**
	 * Why do we need this?
	 * Since React Native does not include a polyfill for URL..
	 * react-native-url-polyfill is a full implementation of the WHATWG URL Standard optimized for React Native.
	 * @see https://www.npmjs.com/package/react-native-url-polyfill
	 */
	setupURLPolyfill();
} else if (Platform.OS === 'android') {
	// other thing for android
} else if (Platform.OS === 'web') {
	// it's on web!
} else {
	// you probably won't end up here unless you support another platform!
}

/**
 * Tanstack query instance
 * @see https://www.npmjs.com/package/@tanstack/react-query?activeTab=readme
 */
const queryClient = new QueryClient();

const Root = () => (
	<QueryClientProvider client={queryClient}>
		<ThemeProvider>
			<APIProvider>
				<App />
			</APIProvider>
		</ThemeProvider>
	</QueryClientProvider>
);

/**
 * Required by Expo
 * This registers the Root component with Expo
 */
registerRootComponent(Root);
