import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_KEY } from '@env';

/**
 * OpenAIApi - object-oriented interface
 * @summary Implemented to simplify the process of making API requests and handling responses in an organized and intuitive manner.
 */
export const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_KEY }));

/**
 * createCompletion - OpenAIApi method
 * @summary Using a large dataset of diverse text sources, the model has been trained to understand and generate coherent and contextually relevant responses.
 */
export const createCompletion = ({
	model = 'text-davinci-003',
	prompt = 'inspirational and motivational quote',
	temperature = 0.5,
	max_tokens = 50
}) =>
	new Promise<{ data: string }>((resolve, reject) => {
		openai
			.createCompletion({
				model,
				prompt,
				temperature,
				max_tokens
			})
			.then((response) => {
				const completion = response.data.choices[0].text;

				if (!completion) {
					throw new Error(`The model "${model}" had no response, try another prompt.`);
				}

				resolve({ data: completion.trim() });
			})
			.catch(reject);
	});
