import React from 'react';
import { Text, TextInput, View, Pressable, Alert } from 'react-native';
import { defaultTheme, accentTheme } from '../providers/theme';
import { Button } from '../components';
import { useThemeProvider, useAPIProvider } from '../providers';
import { RequestStatus } from '../api';

const CONTENT = {
	title: 'OpenAI Quotes',
	quoteDefaultTitle: 'nothing to see here.',
	requestQuoteButtonTitle: 'Request Random Quote',
	defaultThemeButtonTitle: 'Show Default Theme',
	sendToSlackButtonTitle: 'Send to Slack (TBD)',
	accentThemeButtonTitle: 'Show Accent Theme'
};

const completionOptions = {
	model: 'text-davinci-003',
	prompt: 'give me a unique random quote from someone famous to inspire me to be great',
	temperature: 1,
	max_tokens: 50
};

export function Home() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [status, setStatus] = React.useState<RequestStatus>('idle');
	const [requestLog, setRequestLog] = React.useState<string[]>(['idle']);
	const [generatedQuote, setGeneratedQuote] = React.useState<string>(CONTENT.quoteDefaultTitle);

	/**
	 * Custom ThemeProvider hook
	 */
	const { theme, setTheme } = useThemeProvider();

	/**
	 * Custom APIProvider hook
	 */
	const { createCompletion, users } = useAPIProvider();

	// helper to add items to report log array
	const updateRequestLog = (item: string) => setRequestLog((state) => [...state, item]);

	// method that calls openai endpoint
	const handleOpenAIRequest = async () => {
		try {
			setStatus('start');
			setRequestLog(['started request..']);
			setIsLoading(true);
			setGeneratedQuote(generatedQuote + '...');

			updateRequestLog('requesting openai resources..');
			const response = await createCompletion(completionOptions);

			const completion = response.data;

			updateRequestLog('openai request successful..');

			setGeneratedQuote(completion);
			updateRequestLog('all done!');
			setStatus('end');

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			updateRequestLog('request failed!');
			setStatus('error');
			updateRequestLog(`error: ${error.message}`);
		} finally {
			setIsLoading(false);
			console.log('cached api results:', users?.length);
		}
	};

	const getRequestStatus = (status: RequestStatus) => {
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
		<View style={theme.logContainer}>
			<Text style={theme.logTitle}>Request Log:</Text>
			{requestLog.map((itm, idx) => (
				<Text key={`${itm}${idx}`} style={theme.logItem(itm)}>{`- ${itm}`}</Text>
			))}
		</View>
	);

	return (
		<View style={theme.container}>
			<Text style={theme.title}>{CONTENT.title}</Text>
			<Text style={theme.subTitle}>{getRequestStatus(status)}</Text>

			<TextInput
				multiline
				style={theme.textInput}
				editable={isLoading}
				value={generatedQuote as string}
			/>

			<Button onPress={handleOpenAIRequest} disabled={isLoading} style={theme}>
				<Text style={theme.buttonTitle}>{CONTENT.requestQuoteButtonTitle}</Text>
			</Button>

			<Button onPress={() => Alert.alert('Not implemented.')} disabled={true} style={theme}>
				<Text style={theme.buttonTitle}>{CONTENT.sendToSlackButtonTitle}</Text>
			</Button>

			{theme.name !== 'default' && (
				<Pressable style={theme.secondaryButton} onPress={() => setTheme(defaultTheme)}>
					<Text style={theme.buttonTitle}>{CONTENT.defaultThemeButtonTitle}</Text>
				</Pressable>
			)}

			{theme.name !== 'accent' && (
				<Pressable style={theme.secondaryButton} onPress={() => setTheme(accentTheme)}>
					<Text style={theme.buttonTitle}>{CONTENT.accentThemeButtonTitle}</Text>
				</Pressable>
			)}

			<RequestLog />
		</View>
	);
}
