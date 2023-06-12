import { ReactNode } from 'react';
import React from 'react-native';
import { Pressable } from 'react-native';
import styles from '../../styles';

interface ButtonProps {
	disabled: boolean;
	onPress: () => void;
	children: ReactNode;
}

export const Button = ({ onPress, children, disabled }: ButtonProps) => (
	<Pressable
		style={disabled ? styles.buttonDisabled : styles.button}
		onPress={!disabled ? onPress : () => null}
	>
		{children}
	</Pressable>
);
