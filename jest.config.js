module.exports = {
    setupFilesAfterEnv: ['@testing-library/react', '@testing-library/jest-dom'],
    testEnvironment: "jsdom",
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
};
