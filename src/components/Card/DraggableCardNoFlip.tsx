import React, { ReactNode, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DraggableCard = ({ children }: { children: ReactNode }) => {
	const [translation, setTranslation] = useState({ x: 0, y: 0 });
	const [isFlipped, setIsFlipped] = useState(false);
	const translationX = new Animated.Value(0);
	const translationY = new Animated.Value(0);
	const gestureState = new Animated.Value(State.UNDETERMINED);
	const rotateY = new Animated.Value(0);

	const onGestureEvent = Animated.event(
		[{ nativeEvent: { translationX, translationY, state: gestureState } }],
		{ useNativeDriver: false }
	);

	const onHandlerStateChange = (event: {
		nativeEvent: { state: number; translationX: number; translationY: number };
	}) => {
		if (event.nativeEvent.state === State.END) {
			const newX = translation.x + event.nativeEvent.translationX;
			const newY = translation.y + event.nativeEvent.translationY;

			setTranslation({ x: newX, y: newY });

			translationX.setValue(0);
			translationY.setValue(0);
		}
	};

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
		Animated.spring(rotateY, {
			toValue: isFlipped ? 0 : 180,
			friction: 8,
			tension: 10,
			useNativeDriver: true
		}).start();
	};

	const frontInterpolate = rotateY.interpolate({
		inputRange: [0, 180],
		outputRange: ['0deg', '180deg']
	});

	const backInterpolate = rotateY.interpolate({
		inputRange: [0, 180],
		outputRange: ['180deg', '360deg']
	});

	const frontAnimatedStyle = {
		transform: [{ rotateY: frontInterpolate }]
	};

	const backAnimatedStyle = {
		transform: [{ rotateY: backInterpolate }]
	};

	return (
		<View style={styles.container}>
			<PanGestureHandler
				onGestureEvent={onGestureEvent}
				onHandlerStateChange={onHandlerStateChange}
			>
				<Animated.View
					style={[
						styles.card,
						{
							transform: [
								{ translateX: Animated.add(translation.x, translationX) },
								{ translateY: Animated.add(translation.y, translationY) }
							]
						}
					]}
				>
					<TapGestureHandler onActivated={handleFlip}>
						<Animated.View style={[styles.flipCard, frontAnimatedStyle]}>{children}</Animated.View>
					</TapGestureHandler>

					<TapGestureHandler onActivated={handleFlip}>
						<Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
							<Text style={styles.dayOfWeek}>Monday</Text>
						</Animated.View>
					</TapGestureHandler>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	card: {
		width: 300,
		height: 200,
		backgroundColor: 'lightblue',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5
	},
	flipCard: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backfaceVisibility: 'hidden'
	},
	flipCardBack: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%'
	},
	dayOfWeek: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white'
	}
});

export default DraggableCard;
