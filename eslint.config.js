import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
	js.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				document: 'readonly',
				window: 'readonly',
				console: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': typescript,
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			prettier,
		},
		rules: {
			// Prettier integration - turn off conflicting rules
			...prettierConfig.rules,
			'prettier/prettier': 'error',

			// React Refresh
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],

			// TypeScript rules
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'@typescript-eslint/no-var-requires': 'error',
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/no-empty-function': 'warn',
			'@typescript-eslint/no-inferrable-types': 'off',

			// General rules
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-unused-vars': 'off', // Use TypeScript version instead
			'no-var': 'error',
			'prefer-const': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-template': 'error',
			eqeqeq: ['error', 'always'],
			curly: ['error', 'all'],

			// React rules
			'react/prop-types': 'off', // Using TypeScript
			'react/react-in-jsx-scope': 'off', // Not needed with React 17+
			'react/jsx-uses-react': 'off', // Not needed with React 17+
			'react/jsx-uses-vars': 'error',
			'react/jsx-no-undef': 'error',
			'react/jsx-key': 'error',
			'react/jsx-no-duplicate-props': 'error',
			'react/jsx-no-useless-fragment': 'error',
			'react/jsx-pascal-case': 'error',
			'react/no-array-index-key': 'warn',
			'react/no-danger': 'warn',
			'react/no-deprecated': 'error',
			'react/no-direct-mutation-state': 'error',
			'react/no-find-dom-node': 'error',
			'react/no-is-mounted': 'error',
			'react/no-render-return-value': 'error',
			'react/no-string-refs': 'error',
			'react/no-unescaped-entities': 'error',
			'react/no-unknown-property': 'error',
			'react/no-unsafe': 'warn',
			'react/require-render-return': 'error',
			'react/self-closing-comp': 'error',
			'react/sort-comp': 'off',
			'react/sort-prop-types': 'off',
			'react/void-dom-elements-no-children': 'error',

			// React Hooks rules
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		files: ['*.config.{js,ts}', 'vite.config.ts'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				__dirname: 'readonly',
				__filename: 'readonly',
				process: 'readonly',
				Buffer: 'readonly',
				global: 'readonly',
				console: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': typescript,
		},
		rules: {
			'@typescript-eslint/no-var-requires': 'off',
			'no-console': 'off',
		},
	},
	{
		files: ['tailwind.config.js', 'postcss.config.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'commonjs',
			globals: {
				module: 'readonly',
				require: 'readonly',
				exports: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				process: 'readonly',
				Buffer: 'readonly',
				global: 'readonly',
				console: 'readonly',
			},
		},
		rules: {
			'no-console': 'off',
		},
	},
	{
		ignores: ['dist', 'node_modules'],
	},
]
