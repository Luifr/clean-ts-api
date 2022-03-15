const { pathsToModuleNameMapper } = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
	collectCoverageFrom: ['<rootDir>/**/*.ts'],
	coverageDirectory: "../coverage",
	watchPathIgnorePatterns: ['globalConfig'],
	coveragePathIgnorePatterns: [
		// TODO: remove this ignore later?
		"<rootDir>/index.ts",
		"<rootDir>/presentation/interfaces/",
		"<rootDir>/domain",
		"<rootDir>/presentation/errors",
	],
	coverageProvider: "v8",
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
	rootDir: './src',
	roots: [
		"<rootDir>/"
	],
	preset: '@shelf/jest-mongodb',
	transform: {
		'.+\\.ts$': 'ts-jest'
	},
	setupFilesAfterEnv: ["<rootDir>/../jest.setup.js"]
};
