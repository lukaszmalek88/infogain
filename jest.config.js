module.exports = {
    // Indicates the root directory of your project
    rootDir: '.',

    // Test environment setup
    testEnvironment: 'jsdom',

    // Regex pattern to match test files
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',

    // Module name mapper for resolving module dependencies
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/react/dont-cleanup-after-each'],
    testEnvironment: 'jsdom',
};