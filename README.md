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

## Benefits of Semantic Release

- **Semantic Versioning**: Enforces consistent versioning based on semantic versioning principles.
- **Automated Release**: Automates versioning and release management based on commit messages and configuration.
- **Continuous Delivery**: Integrates seamlessly with continuous delivery and deployment workflows.
- **Consistency**: Ensures standardized versioning and release practices across projects and teams.
- **Release Notes**: Automatically generates comprehensive release notes and changelogs.
- **Collaboration**: Streamlines collaboration and communication among team members.

By leveraging semantic-release, development teams can streamline the release process, maintain consistency, automate versioning, and improve collaboration.

Note: Specific implementation and configuration details may vary based on your project and tools used.

## Starting with Version 1.0.0

When beginning a software project, it's beneficial to start with version 1.0.0 rather than 0.0.1. Here's why:

1. **Clear Communication**: Starting with 1.0.0 signifies that the software is in a stable and usable state. It communicates to users and stakeholders that the project has reached a significant milestone and is ready for production use.

2. **Compatibility Assurance**: Version 1.0.0 implies that the software follows the principles of semantic versioning. It assures users that future releases within the 1.x.x range will maintain backward compatibility, reducing the risk of breaking changes.

3. **Support for Early Adopters**: By starting with version 1.0.0, you provide clear instructions on compatibility between early versions and user software. This supports early adopters and encourages them to use and provide feedback on your software, contributing to its improvement.

4. **Established Development Habits**: Adopting version 1.0.0 from the start encourages developers to think about software changes in the context of semantic versioning. It establishes the habit of following the SemVer rules and promotes efficient development practices from the beginning.

5. **Marketing and Perception**: Starting at 1.0.0 may also positively impact the perception of your software. It implies that your project is mature, stable, and ready for broader adoption, enhancing its marketability.

Starting with 1.0.0 allows you to set the stage for a stable, backward-compatible software project. It facilitates clear communication, compatibility assurance, support for early adopters, and establishes development habits aligned with semantic versioning principles.

Please note that while starting at 1.0.0 is recommended, the specific versioning approach may vary based on project requirements and the preferences of your development team.
 - [See versioning recommendations by semver..](https://blog.greenkeeper.io/introduction-to-semver-d272990c44f2)

## Installing Semantic Release Packages

To install the required packages for Semantic Release, follow these steps:

1. Open your terminal or command prompt.

2. Navigate to your project directory.

3. Run the following command to install the necessary packages as dev dependencies:

```shell
npm install -D semantic-release @semantic-release/git @semantic-release/commit-analyzer @semantic-release/release-notes-generator @semantic-release/npm @semantic-release/changelog
