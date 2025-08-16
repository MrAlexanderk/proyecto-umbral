/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  transform: {}
};

