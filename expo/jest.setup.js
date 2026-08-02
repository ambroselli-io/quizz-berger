/* eslint-env jest */
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-store-review', () => ({
  hasAction: jest.fn().mockResolvedValue(false),
  requestReview: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn().mockResolvedValue(undefined),
  hideAsync: jest.fn().mockResolvedValue(undefined),
}));

// Tests drive the API through the mocked `~/services/api` module; a real fetch
// escaping a test should fail loudly rather than hang on the network.
global.fetch = jest.fn(() => Promise.reject(new Error('Unexpected network call in tests')));
