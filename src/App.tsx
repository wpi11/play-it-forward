/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/** these can be removed, placed here to mute errors */

import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createCompletion } from './modules/OpenAI';
import styles from './styles';
import { Button } from './components';
import API from './api';

export default function App() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [generatedQuote, setGeneratedQuote] = React.useState<string | null>('nothing to see here.');

	const handleAPIRequest = async () => {
		const result = await API.get();

		console.log('response:', result.data);
	};

	const handleOpenAIRequest = async () => {
		try {
			setIsLoading(true);
			setGeneratedQuote('Wait, while I think on this...');

			const response = await createCompletion({
				model: 'text-davinci-003',
				prompt: 'give me a unique random quote from someone famous to inspire me to be great',
				temperature: 1,
				max_tokens: 50
			});

			const completion = response.data;

			setGeneratedQuote(completion);
			console.log('completion:', completion);
		} catch (error: any) {
			console.log(error.message);
			setGeneratedQuote(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const generationStatus = isLoading ? 'Working..' : 'Generate Quote with OpenAI';

	return (
		<View style={styles.container}>
			<Text style={styles.title}>OpenAI Quotes</Text>
			<TextInput multiline style={styles.textInput} value={generatedQuote as string} />

			<Button onPress={handleOpenAIRequest} disabled={isLoading}>
				<Text style={styles.buttonTitle}>{generationStatus}</Text>
			</Button>

			<StatusBar style="auto" />
		</View>
	);
}
