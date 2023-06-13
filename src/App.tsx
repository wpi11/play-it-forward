import React from 'react';
import { Text, TextInput, View, Pressable, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { createCompletion } from './modules/OpenAI';
import { useTheme, THEME_TYPES } from './theme';
import { Button } from './components';
import { useUsersApi } from './hooks';

const queryClient = new QueryClient();

type RequestStatus = 'idle' | 'start' | 'end' | 'error';

export function App() {
	const [activeTheme, setActiveTheme] = React.useState(THEME_TYPES.ACCENT);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [status, setStatus] = React.useState<RequestStatus>('idle');
	const [generatedQuote, setGeneratedQuote] = React.useState<string | null>('nothing to see here.');
	const [requestLog, setRequestLog] = React.useState<string[]>(['idle']);
	const styles = useTheme(activeTheme);

	// custom hook that pairs Tanstack Query / Axios
	const { data: users } = useUsersApi();

	// helper to add items to report log array
	const updateLog = (item: string) => {
		setRequestLog((state) => [...state, item]);
	};

	// method that calls openai endpoint
	const handleOpenAIRequest = async () => {
		try {
			setStatus('start');
			setRequestLog(['started request..']);
			setIsLoading(true);
			setGeneratedQuote(generatedQuote + '...');

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

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			updateLog('request failed!');
			setStatus('error');
			updateLog(`error: ${error.message}`);
		} finally {
			setIsLoading(false);
			console.log('cached api results:', users?.length);
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

	const RequestLog = () => (
		<View style={styles.logContainer}>
			<Text style={styles.logTitle}>Request Log:</Text>
			{requestLog.map((itm, idx) => (
				<Text key={`${itm}${idx}`} style={styles.logItem(itm)}>{`- ${itm}`}</Text>
			))}
		</View>
	);

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

			<Button onPress={handleOpenAIRequest} disabled={isLoading} styles={styles}>
				<Text style={styles.buttonTitle}>{'Request Random Quote'}</Text>
			</Button>

			<Button onPress={() => Alert.alert('Not implemented.')} disabled={true} styles={styles}>
				<Text style={styles.buttonTitle}>Send to Slack (WIP)</Text>
			</Button>

			{activeTheme !== THEME_TYPES.DEFAULT && (
				<Pressable
					style={styles.secondaryButton}
					onPress={() => setActiveTheme(THEME_TYPES.DEFAULT)}
				>
					<Text style={styles.buttonTitle}>Show Default Theme</Text>
				</Pressable>
			)}

			{activeTheme !== THEME_TYPES.ACCENT && (
				<Pressable
					style={styles.secondaryButton}
					onPress={() => setActiveTheme(THEME_TYPES.ACCENT)}
				>
					<Text style={styles.buttonTitle}>Show Accent Theme</Text>
				</Pressable>
			)}
			<RequestLog />

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
