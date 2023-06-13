import tw from 'twrnc';

/**
 * Tailwind React Native Classnames
 * styles.button becomes:
 *
 * {"backgroundColor": "#a855f7", "borderRadius": 24, "color": "#fff", "paddingBottom": 16, "paddingLeft": 16, "paddingRight": 16, "paddingTop": 16}
 */

const defaultTheme = {
	title: tw`text-4xl font-bold mb-2`,
	subTitle: tw`text-xl text-gray-300 font-bold`,
	container: tw`flex-1 bg-white items-center justify-center p-2`,
	button: tw`p-4 android:pt-2 bg-blue-600 rounded-md text-white w-64 items-center mb-2`,
	buttonTitle: tw`text-white`,
	buttonDisabled: tw`p-4 bg-gray-600 rounded-md text-white w-64 items-center focus:outline-none opacity-60 mb-2`,
	secondaryButton: tw`p-4 android:pt-2 bg-indigo-600 rounded-md text-white w-64 items-center mb-2`,
	textInput: tw`relative mt-8 mb-4 p-4 bg-gray-200 rounded-md w-full h-28`,
	logContainer: tw`mt-10 mx-auto ml-0 h-24`,
	logTitle: tw`font-bold mb-2`,
	logItem: (type: string) =>
		type.includes('error')
			? tw`text-red-400`
			: type.includes('done')
			? tw`text-green-700`
			: tw`text-gray-900`
};

const accentTheme = {
	title: tw`text-4xl font-bold mb-2 text-white`,
	subTitle: tw`text-xl text-gray-700 font-bold`,
	container: tw`flex-1 bg-gray-900 items-center justify-center p-2`,
	button: tw`p-4 android:pt-2 bg-orange-600 rounded-md text-white w-64 items-center mb-2`,
	buttonTitle: tw`text-white`,
	buttonDisabled: tw`p-4 bg-gray-600 rounded-md text-white w-64 items-center focus:outline-none opacity-60 mb-2`,
	secondaryButton: tw`p-4 android:pt-2 bg-indigo-600 rounded-md text-white w-64 items-center mb-2`,
	textInput: tw`relative mt-8 mb-4 p-4 bg-purple-800 rounded-md w-full h-28 text-white`,
	logContainer: tw`mt-10 mx-auto ml-0 h-24 text-white`,
	logTitle: tw`font-bold mb-2 text-white`,
	logItem: (type: string) =>
		type.includes('error')
			? tw`text-red-400`
			: type.includes('done')
			? tw`text-green-400`
			: tw`text-white`
};

export enum THEME_TYPES {
	DEFAULT,
	ACCENT
}

/**
 * Tailwind React Native Classnames
 * @description Leverages twrnc and exposes styles object
 */
export const useTheme = (theme: THEME_TYPES = THEME_TYPES.DEFAULT) => {
	switch (theme) {
		case THEME_TYPES.DEFAULT:
			return defaultTheme;
		case THEME_TYPES.ACCENT:
			return accentTheme;
	}
};
