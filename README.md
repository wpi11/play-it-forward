# Expo React Native Starter

## Application Entry

By default, the Application entry is set in the `main` field in `package.json`

```
  "main": "node_modules/expo/AppEntry.js",
```

In order to use a custom entry, this value would need to be changed to it's new location.

```
  "main": "src/index.ts",
```

Within `index.ts` you will need to import `expo` and the entry `App` component.
Note: that `registerRootComponent` will need to be imported from `expo` and called with the `App` component as a param.

```
  import { registerRootComponent } from 'expo';
  import App from './App';

  registerRootComponent(App);
```

## Linting & Formatting

To check for lint errors, run: `npm run prettier:check`
To fix lint errors, run: `npm run prettier:fix`

### Issues

- Autoformatting not working? Open VSCode workspace settings JSON and be sure these fields are set:

```
	"editor.codeActionsOnSave": {
		// For ESLint
		"source.fixAll.eslint": true
	},
	"[javascript]": {
  // For JavaScript
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[typescript]": {
  // For TypeScript
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
```

## TailwindCSS

- [Learn more about using Tailwind with TWRNC](https://www.npmjs.com/package/twrnc)

## Environment Variables

1. Create: `.env` at the root and set vars as KEY=VALUE pairs
2. Install package: `npm install react-native-dotenv --save-dev`
3. Modify: babel.config.json with:

```
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true
        }
      ]
    ]
```

4. Types: TS will scream about `@env` missing type declarations
   - Create: `index.d.ts`
   - Declare: module and env variable types

```
declare module '@env' {
  export const API_DOMAIN: string;
}
```

4. Import: envs as named import from `@env`

```
import { API_DOMAIN } from '@env';
console.log('API Domain:', API_DOMAIN)
```

## OpenAI Platform

- [Create your OpenAIApi token..](https://platform.openai.com/)
- [See OpenAIApi language model limits..](https://platform.openai.com/account/rate-limits)

## Node.js Modules

- [Using Node.js Modules in RN Apps](https://javascript.plainenglish.io/using-core-node-js-modules-in-react-native-apps-e6002a33b6ff)

## Introduction to SemVer

### Why version your software?
  - show progress
    - signify that one release of a piece of software is different from another release of the same software.
  - marketing
    - “Version 2.0.0 has 100 new features over version 1.0.0” 
  - compatibility
    - developers use version numbers
    - developers can make a decision on how compatible different versions are.

### What do we use?

semantic-release automates the whole package release workflow including: determining the next version number, generating the release notes, and publishing the package.

npm packages required:

`npm i -D semantic-release @semantic-release/git @semantic-release/commit-analyzer @semantic-release/release-notes-generator @semantic-release/npm @semantic-release/changelog`

Things to consider: 

- it's encouraged to start projects with 1.0.0 
- communicating software stability by using modifiers, like: `v1.0.0-alpha` `v1.0.0-beta` `v1.0.0-preview`
- [See versioning recommendations by semver..](https://blog.greenkeeper.io/introduction-to-semver-d272990c44f2)