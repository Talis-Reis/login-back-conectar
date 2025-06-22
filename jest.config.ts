import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: './',
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/',
	}),
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: ['*/.(t|j)s', '!*/.module.ts', '!**/main.ts'],
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
};

export default config;
