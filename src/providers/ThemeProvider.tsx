import React, { ReactNode } from 'react';
import { THEME_TYPES, defaultTheme } from './theme';

type ThemeContextTypes = {
	theme: THEME_TYPES;
	setTheme: (theme: THEME_TYPES) => void;
};

const ThemeContext = React.createContext<ThemeContextTypes>({
	theme: defaultTheme,
	setTheme: () => console.log('defaultTheme')
});

/**
 * ThemeProvider custom hook that provides global theme control
 * @returns {object} - An object containing the theme object, and setTheme function.
 */
export const useThemeProvider = (): ThemeContextTypes => React.useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = React.useState<THEME_TYPES>(defaultTheme);

	const actions = React.useMemo(() => {
		return {
			theme: state,
			setTheme: (theme: THEME_TYPES) => dispatch(theme)
		};
	}, [state]);

	return <ThemeContext.Provider value={actions}>{children}</ThemeContext.Provider>;
}
