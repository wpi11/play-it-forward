import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import DraggableCard from './components/Card/DraggableCard';
import { useTask } from './hooks';
import { RenderIf } from './components/RenderIf';
import { TaskComponent } from './components/Task';

const App = () => {
	const { data: task, isFetching, refetch } = useTask();

	const LoadingComponent = () => <Text>Loading..</Text>;

	return (
		<LinearGradient colors={['#FF6B6B', '#FF8E53']} style={styles.container}>
			<GestureHandlerRootView>
				<DraggableCard>
					<View>
						<RenderIf condition={!isFetching && !!task} fallback={<LoadingComponent />}>
							<TaskComponent task={task} refetch={refetch} />
						</RenderIf>
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
