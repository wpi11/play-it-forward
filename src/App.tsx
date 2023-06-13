import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Home } from './views/Home';
import { useThemeProvider } from './providers/ThemeProvider';

export default function App() {
	const { theme } = useThemeProvider();

	return (
		<View style={theme.root}>
			<Home />

			<StatusBar style="auto" />
		</View>
	);
}
