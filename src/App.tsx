import React from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import DraggableCard from './components/Card/DraggableCard';
import { useTask } from './hooks';

const App = () => {
	const { data: task, isFetching, refetch } = useTask();

	return (
		<LinearGradient colors={['#FF6B6B', '#FF8E53']} style={styles.container}>
			<GestureHandlerRootView>
				<DraggableCard>
					<View>
						{isFetching ? (
							<>
								<Text>Loading..</Text>
							</>
						) : (
							<>
								<Text style={tw`text-xl font-semibold mb-4`}>Task of the Week</Text>
								<Text style={tw`text-lg font-bold mb-2 text-indigo-600`}>{task?.title}</Text>
								<Text style={tw`text-gray-600 w-full`}>{task?.description}</Text>

								<View
									style={{
										borderRadius: 20,
										marginTop: 20,
										padding: 10,
										alignSelf: 'center',
										backgroundColor: 'orange'
									}}
								>
									<TouchableNativeFeedback onPress={() => refetch()}>
										<Text>Get Another Task</Text>
									</TouchableNativeFeedback>
								</View>
							</>
						)}
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
