/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/** these can be removed, placed here to mute errors */

import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider, QueryClient, useQueryClient } from '@tanstack/react-query';
import { createCompletion } from './modules/OpenAI';
import styles from './styles';
import { Button } from './components';
import { useCachedApi } from './hooks';

const queryClient = new QueryClient();

type RequestStatus = 'idle' | 'start' | 'end' | 'error';

export function App() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [status, setStatus] = React.useState<RequestStatus>('idle');
	const [generatedQuote, setGeneratedQuote] = React.useState<string | null>('nothing to see here.');
	const [isCached, setIsCached] = React.useState<string | undefined>('');
	const [log, setLog] = React.useState<string[]>(['idle']);
	const cache = useCachedApi();
	const client = useQueryClient();

	const updateLog = (item: any) => {
		setLog((state) => [...state, item]);
	};

	const handleOpenAIRequest = async () => {
		try {
			setStatus('start');
			setLog(['started request..']);
			setIsLoading(true);
			setGeneratedQuote(generatedQuote + '...');
			setIsCached('');

			new Promise<string>((resolve) => {
				console.log('Tanstack query hook started..');
				setTimeout(function () {
					console.log('Tanstack query hook done!');
					setIsCached(queryClient.getQueryData(['users']));
					resolve('Done');
				}, 1000);
			});

			updateLog('requesting openai resources..');
			const response = await createCompletion({
				model: 'text-davinci-003',
				prompt: 'give me a unique random quote from someone famous to inspire me to be great',
				temperature: 1,
				max_tokens: 50
			});

			const completion = response.data;

			updateLog('openai request successful..');

			setGeneratedQuote(completion);
			updateLog('all done!');
			setStatus('end');

			console.log('completion:', completion);
		} catch (error: any) {
			updateLog('request failed!');
			setStatus('error');
			console.log(error.message);
			updateLog(`error: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	const requestStatus = () => {
		switch (status) {
			case 'idle':
				return 'Idle';
			case 'start':
				return 'Thinking 🤔';
			case 'end':
				return 'Done ✅';
			case 'error':
				return 'Failed request 🙅‍♂️';
		}
	};

	const requestLogColorStyle = (logItem: string) =>
		logItem.includes('error') ? '#FF0000' : logItem.includes('done') ? '#008000' : '';

	return (
		<View style={styles.container}>
			<Text style={styles.title}>OpenAI Quotes</Text>
			<Text style={styles.subTitle}>{requestStatus()}</Text>

			<TextInput
				multiline
				style={styles.textInput}
				editable={isLoading}
				value={generatedQuote as string}
			/>

			<Button onPress={handleOpenAIRequest} disabled={isLoading}>
				<Text style={styles.buttonTitle}>{'Request Random Quote'}</Text>
			</Button>

			<View style={{ marginTop: 40, alignSelf: 'flex-start', height: 100 }}>
				<Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Request Log:</Text>
				{log.map((itm) => (
					<Text key={itm} style={{ color: requestLogColorStyle(itm) }}>{`- ${itm}`}</Text>
				))}
			</View>

			<StatusBar style="auto" />
		</View>
	);
}

export default function Root() {
	return (
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	);
}
