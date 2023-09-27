import React, { ReactNode, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';

const DraggableCard = ({ children }: { children: ReactNode }) => {
	// State to keep track of the card's flipped state
	const [isFlipped, setIsFlipped] = useState(false);

	// Animated values for translation, gesture state, and rotation
	const translation = new Animated.ValueXY();
	const gestureState = new Animated.Value(State.UNDETERMINED);
	const rotateY = new Animated.Value(0);

	// Event handler for pan gesture
	const onGestureEvent = Animated.event(
		[
			{
				nativeEvent: {
					translationX: translation.x,
					translationY: translation.y,
					state: gestureState
				}
			}
		],
		{ useNativeDriver: false }
	);

	// Handler for when pan gesture state changes
	const onHandlerStateChange = (event: { nativeEvent: { state: number } }) => {
		if (event.nativeEvent.state === State.END) {
			Animated.spring(translation, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
		}
	};

	// Handler for flipping the card
	const handleFlip = () => {
		setIsFlipped(!isFlipped);
		Animated.spring(rotateY, {
			toValue: isFlipped ? 0 : 1,
			friction: 8,
			tension: 10,
			useNativeDriver: true
		}).start();
	};

	// Interpolate rotation values for front and back
	const frontInterpolate = rotateY.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '180deg']
	});

	const backInterpolate = rotateY.interpolate({
		inputRange: [0, 1],
		outputRange: ['180deg', '360deg']
	});

	// Styles for the front and back of the card
	const frontAnimatedStyle = {
		transform: [
			{ translateX: translation.x },
			{ translateY: translation.y },
			{ rotateY: frontInterpolate }
		]
	};

	const backAnimatedStyle = {
		transform: [
			{ translateX: translation.x },
			{ translateY: translation.y },
			{ rotateY: backInterpolate }
		]
	};

	return (
		<View style={styles.container}>
			{/* Front of the card */}
			<PanGestureHandler
				onGestureEvent={onGestureEvent}
				onHandlerStateChange={onHandlerStateChange}
			>
				<Animated.View style={[styles.card, frontAnimatedStyle]}>
					{/* Tap to flip */}
					<TapGestureHandler onActivated={handleFlip}>
						<Animated.View style={styles.flipCard}>
							<Text style={styles.dayOfWeek}>Monday</Text>
						</Animated.View>
					</TapGestureHandler>
				</Animated.View>
			</PanGestureHandler>

			{/* Back of the card */}
			<PanGestureHandler
				onGestureEvent={onGestureEvent}
				onHandlerStateChange={onHandlerStateChange}
			>
				<Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
					{/* Tap to flip */}
					<TapGestureHandler onActivated={handleFlip}>
						<Animated.View style={styles.flipCard}>{children}</Animated.View>
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
		elevation: 5,
		backfaceVisibility: 'hidden'
	},
	flipCard: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backfaceVisibility: 'hidden'
	},
	backCard: {
		position: 'absolute',
		top: 0,
		left: 0
	},
	dayOfWeek: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white'
	}
});

export default DraggableCard;
