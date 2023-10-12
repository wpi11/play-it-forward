import React, { ReactNode, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';

const DraggableCard = ({ children }: { children: ReactNode }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const translation = new Animated.ValueXY();
	const gestureState = new Animated.Value(State.UNDETERMINED);
	const rotateY = new Animated.Value(0);
	const scale = new Animated.Value(1);

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

	const onHandlerStateChange = (event: { nativeEvent: { state: number } }) => {
		if (event.nativeEvent.state === State.END) {
			Animated.spring(translation, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
		}
	};

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
		Animated.timing(scale, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: false
		}).start(() => {
			setIsFlipped(!isFlipped);
			Animated.timing(scale, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: false
			}).start();
		});
	};

	const frontAnimatedStyle = {
		transform: [
			{ translateX: translation.x },
			{ translateY: translation.y },
			{ rotateY: rotateY.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) },
			{ scaleX: scale }
		]
	};

	const backAnimatedStyle = {
		transform: [
			{ translateX: translation.x },
			{ translateY: translation.y },
			{ rotateY: rotateY.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] }) },
			{ scaleX: scale },
			{ perspective: 1000 } // Add perspective for 3D effect
		]
	};

	const getDayOfWeek = () => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const today = new Date().getDay();

		return days[today];
	};

	return (
		<View style={styles.container}>
			<View style={styles.cardContainer}>
				<PanGestureHandler
					onGestureEvent={onGestureEvent}
					onHandlerStateChange={onHandlerStateChange}
				>
					<Animated.View style={[styles.card, isFlipped ? backAnimatedStyle : frontAnimatedStyle]}>
						<TapGestureHandler onActivated={handleFlip}>
							<Animated.View style={styles.cardContent}>
								<Text style={styles.sideLabel}>{isFlipped ? 'B' : `${getDayOfWeek()}'s Task`}</Text>
							</Animated.View>
						</TapGestureHandler>
					</Animated.View>
				</PanGestureHandler>
				<PanGestureHandler
					onGestureEvent={onGestureEvent}
					onHandlerStateChange={onHandlerStateChange}
				>
					<Animated.View style={[styles.card, isFlipped ? frontAnimatedStyle : backAnimatedStyle]}>
						<TapGestureHandler onActivated={handleFlip}>
							<Animated.View style={styles.cardContent}>{children}</Animated.View>
						</TapGestureHandler>
					</Animated.View>
				</PanGestureHandler>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 300,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cardContainer: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	card: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: '#6CB2EB',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
		backfaceVisibility: 'hidden'
	},
	cardContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},
	sideLabel: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'black' // Use black text for both sides
	}
});

export default DraggableCard;
