module.exports = {
	rules: {
		'prettier/prettier': 2,
		'newline-after-var': [2, 'always'],
		'newline-before-return': 2,
		'space-before-blocks': [2, { functions: 'always', keywords: 'always', classes: 'always' }],
		'react/react-in-jsx-scope': 0,
		'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		'import/newline-after-import': ['error', { count: 1 }],
		'padding-line-between-statements': [
			2,
			{ blankLine: 'always', prev: '*', next: 'block' },
			{ blankLine: 'always', prev: 'block', next: '*' },
			{ blankLine: 'always', prev: '*', next: 'block-like' },
			{ blankLine: 'always', prev: 'block-like', next: '*' }
		],
		'lines-around-comment': [
			2,
			{
				beforeLineComment: true,
				allowBlockStart: true
			}
		],
		'import/order': [
			'error',
			{
				groups: ['external', 'index', 'parent', 'sibling', 'internal', 'builtin', 'object', 'type']
			}
		]
	},
	parser: '@typescript-eslint/parser',
	extends: [
		'prettier',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	plugins: ['@typescript-eslint', 'react', 'react-native', 'prettier', 'import'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	ignorePatterns: ['.eslintrc.cjs'],
	settings: {
		react: {
			version: 'detect'
		}
	},
	env: {
		jest: true,
		es2022: true,
		browser: true,
		node: true
	}
};
