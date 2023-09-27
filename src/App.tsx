import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import DraggableCard from './components/Card/DraggableCard';
import { useTasksApi } from './hooks';

const App = () => {
	const { data: task } = useTasksApi();

	return (
		<LinearGradient // Add LinearGradient as the background
			colors={['#FF6B6B', '#FF8E53']}
			style={styles.container}
		>
			<GestureHandlerRootView>
				<DraggableCard>
					<View style={{ padding: 10 }}>
						<Text style={tw`text-xl font-semibold mb-4`}>Task of the Week</Text>
						<Text style={tw`text-lg font-bold mb-2 text-indigo-600`}>{task?.title}</Text>
						<Text style={tw`text-gray-600`}>
							{task?.description}
							{/* {JSON.stringify(task, null, 2)} */}
						</Text>
					</View>
				</DraggableCard>
			</GestureHandlerRootView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	}
});

export default App;
