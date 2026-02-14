import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '~/types/quizz';

// AsyncStorage adapter for Zustand
const asyncStorageAdapter: StateStorage = {
  getItem: async (name: string) => {
    return (await AsyncStorage.getItem(name)) ?? null;
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

interface State {
  user: User | null;
  token: string | null;
}

interface Actions {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const useStore = create<State & Actions>()(
  persist(
    (set): State & Actions => ({
      user: null,
      token: null,
      setUser: (user: User | null) => set({ user }),
      setToken: (token: string | null) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'quizz-du-berger-store',
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);

export default useStore;
