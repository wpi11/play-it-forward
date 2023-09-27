import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { useThemeProvider } from '../../providers';

type CardType = {
	taskText: string;
};

export const Card = ({ taskText }: CardType) => {
	const { theme } = useThemeProvider();

	return (
		<View style={theme.root}>
			<Text style={tw`text-xl font-semibold mb-4`}>Task of the Week</Text>
			<Text style={tw`text-lg font-bold mb-2 text-indigo-600`}>{taskText}</Text>
			<Text style={tw`text-gray-600`}>
				Complete this task by the end of the week to earn rewards!
			</Text>
		</View>
	);

	return (
		<View style={tw`bg-white shadow-md rounded-lg p-6 mt-24`}>
			<Text style={tw`text-xl font-semibold mb-4`}>Task of the Week</Text>
			<Text style={tw`text-lg font-bold mb-2 text-indigo-600`}>{taskText}</Text>
			<Text style={tw`text-gray-600`}>
				Complete this task by the end of the week to earn rewards!
			</Text>
		</View>
	);
};
