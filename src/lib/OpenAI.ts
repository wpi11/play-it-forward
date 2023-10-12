import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_KEY } from '@env';

export type OPENAI_PROPS = {
	model: string;
	prompt: string;
	temperature: number;
	max_tokens: number;
};

/**
 * OpenAIApi - object-oriented interface
 * @summary Implemented to simplify the process of making API requests and handling responses in an organized and intuitive manner.
 */
export const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_KEY }));

/**
 * createCompletion - OpenAIApi method
 * @summary Using a large dataset of diverse text sources, the model has been trained to understand and generate coherent and contextually relevant responses.
 */
export const createCompletion = async ({
	model = 'text-davinci-003',
	prompt = 'inspirational and motivational quote',
	temperature = 0.5,
	max_tokens = 50
}: OPENAI_PROPS) => {
	const response = await openai.createCompletion({ model, prompt, temperature, max_tokens });

	if (!response) {
		throw new Error(`The model "${model}" had no response, try another prompt.`);
	} else {
		const completion = response.data.choices[0].text;

		if (!completion) {
			throw new Error(`The model "${model}" had no completion, try another prompt.`);
		}

		return { data: completion.trim() };
	}
};
