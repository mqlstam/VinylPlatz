/* eslint-disable */
export default {
  displayName: 'data-api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/data-api',
  roots: ['<rootDir>/src', '<rootDir>/../../libs'], 
};