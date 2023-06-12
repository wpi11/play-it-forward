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
	button: tw`p-4 android:pt-2 bg-blue-600 rounded-md text-white w-64 items-center`,
	buttonTitle: tw`text-white`,
	buttonDisabled: tw`p-4 bg-gray-600 rounded-md text-white w-64 items-center focus:outline-none opacity-60"`,
	textInput: tw`relative mt-8 mb-4 p-4 bg-gray-200 rounded-md w-full h-28`
};

/**
 * Tailwind React Native Classnames
 * @description Leverages twrnc and exposes styles object
 */
export default {
	...defaultTheme,
	theme: {
		default: defaultTheme,
		accent: {}
	}
};
