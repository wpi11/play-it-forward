import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import App from './App';

// platform conditional
if (Platform.OS === 'ios') {
	/**
	 * Why do we need this?
	 * Since React Native does include a polyfill for URL..
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

// this registers the App with expo
registerRootComponent(App);
