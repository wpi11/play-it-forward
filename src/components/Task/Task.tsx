import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

import { Task } from '../../types/Task';

interface TaskComponentType {
	task: Task | undefined;
	refetch: () => void;
}

export const TaskComponent = ({ task, refetch }: TaskComponentType) => {
	return (
		<View style={styles.container}>
			<View style={{ alignItems: 'center' }}>
				<Text style={tw`text-xl font-semibold mb-8`}>Task of the Week</Text>
			</View>
			<Text style={styles.title}>{task?.title}</Text>
			<ScrollView style={styles.descriptionContainer}>
				<Text style={styles.description}>{task?.description}</Text>
			</ScrollView>

			<View style={{ alignItems: 'center' }}>
				<TouchableOpacity style={styles.button} onPress={() => refetch()}>
					<Text style={tw`text-white`}>Get Another Task</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = {
	container: {
		padding: 16
	},
	centeredContent: {
		alignItems: 'center' // Center content horizontally
	},
	title: {
		...tw`text-lg font-bold mb-2 text-indigo-600`
	},
	descriptionContainer: {
		maxHeight: 150 // Limit the maximum height of the description
	},
	description: {
		...tw`text-gray-600`
	},
	button: {
		borderRadius: 20,
		backgroundColor: 'orange',
		padding: 10,
		marginTop: 20
	}
};
