/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	verbose: true,
	coverageDirectory: "<rootDir>/tests/coverage",
	detectOpenHandles: true,
	testTimeout: 50000,
};
