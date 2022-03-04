const { pathsToModuleNameMapper } = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
	collectCoverageFrom: ['<rootDir>/**/*.ts'],
	coverageDirectory: "../coverage",
	coveragePathIgnorePatterns: [
		"<rootDir>/index.ts",
		"<rootDir>/presentation/protocols/"
	],
	coverageProvider: "v8",
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
	rootDir: './src',
	roots: [
		"<rootDir>/"
	],
	testEnvironment: "node",
	transform: {
		'.+\\.ts$': 'ts-jest'
	},
};
