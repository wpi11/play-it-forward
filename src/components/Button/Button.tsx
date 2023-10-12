import { ReactNode } from 'react';
import React from 'react-native';
import { Pressable } from 'react-native';
import { THEME_TYPES } from '../../providers/theme';

interface ButtonProps {
	disabled?: boolean;
	onPress: () => void;
	children?: ReactNode;
	style?: THEME_TYPES;
}

export const Button = ({ onPress, children, disabled, style }: ButtonProps) => {
	return (
		<Pressable
			style={disabled ? style?.buttonDisabled : style?.button}
			onPress={!disabled ? onPress : () => null}
		>
			{children}
		</Pressable>
	);
};
