import { ReactNode } from 'react';
import React from 'react-native';
import { Pressable } from 'react-native';
import { THEME_TYPES, useTheme } from '../../theme';

interface ButtonProps {
	disabled: boolean;
	onPress: () => void;
	children: ReactNode;
	styles: any;
}

export const Button = ({ onPress, children, disabled, styles }: ButtonProps) => {
	// const styles = useTheme(THEME_TYPES.ACCENT);

	return (
		<Pressable
			style={disabled ? styles.buttonDisabled : styles.button}
			onPress={!disabled ? onPress : () => null}
		>
			{children}
		</Pressable>
	);
};
