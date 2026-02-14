import AsyncStorage from '@react-native-async-storage/async-storage';

// Synchronous-like storage wrapper using AsyncStorage
// For the API service, we use a synchronous cache that's loaded on init
let cache: Record<string, string> = {};
let initialized = false;

const storage = {
  // Initialize cache from AsyncStorage (call on app start)
  init: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const pairs = await AsyncStorage.multiGet(keys);
      for (const [key, value] of pairs) {
        if (value !== null) cache[key] = value;
      }
      initialized = true;
    } catch {
      initialized = true;
    }
  },

  // Synchronous read from cache
  getString: (key: string): string | undefined => {
    return cache[key];
  },

  // Write to both cache and AsyncStorage
  set: (key: string, value: string) => {
    cache[key] = value;
    AsyncStorage.setItem(key, value).catch(() => {});
  },

  // Delete from both cache and AsyncStorage
  delete: (key: string) => {
    delete cache[key];
    AsyncStorage.removeItem(key).catch(() => {});
  },
};

export default storage;
