import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing
} from 'react-native-reanimated';
import { useThemeProvider } from '../providers';

export function Landing() {
	const { theme, setTheme } = useThemeProvider();

	const randomWidth = useSharedValue(50);

	const config = {
		duration: 500,
		easing: Easing.bezier(0.5, 0.01, 0, 1)
	};

	const style = useAnimatedStyle(() => {
		return {
			width: withTiming(randomWidth.value, config)
		};
	});

	return (
		<GestureDetector gesture={Gesture.Manual()}>
			<View style={theme.container}>
				<Text style={theme.title}>Landing</Text>

				<Animated.View style={[styles.box, style]} />

				<Button
					title="Shrink"
					onPress={() => {
						randomWidth.value = 150;
					}}
				/>
				<Button
					title="Expand"
					onPress={() => {
						randomWidth.value = 350;
					}}
				/>
			</View>
		</GestureDetector>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column'
	},
	box: {
		width: 100,
		height: 80,
		backgroundColor: 'black',
		margin: 30
	}
});
