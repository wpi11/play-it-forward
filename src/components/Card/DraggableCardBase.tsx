import React, { useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const DraggableCard = () => {
	const [translation, setTranslation] = useState({ x: 0, y: 0 });
	const translationX = new Animated.Value(0);
	const translationY = new Animated.Value(0);
	const gestureState = new Animated.Value(State.UNDETERMINED);

	const onGestureEvent = Animated.event(
		[{ nativeEvent: { translationX, translationY, state: gestureState } }],
		{ useNativeDriver: false }
	);

	const onHandlerStateChange = (event: {
		nativeEvent: { state: number; translationX: number; translationY: number };
	}) => {
		if (event.nativeEvent.state === State.END) {
			setTranslation({
				x: translation.x + event.nativeEvent.translationX,
				y: translation.y + event.nativeEvent.translationY
			});

			translationX.setValue(0);
			translationY.setValue(0);
		}
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
					{/* Your card content */}
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
		borderRadius: 10
	}
});

export default DraggableCard;
