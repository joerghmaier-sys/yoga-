import { Platform } from 'react-native';

export const useStorage = () => {
  const getItem = async (key: string) => {
    if (Platform.OS === 'web') {
      return Promise.resolve(localStorage.getItem(key));
    }
    return null;
  };

  const setItem = async (key: string, value: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return Promise.resolve();
    }
    return Promise.resolve();
  };

  const removeItem = async (key: string) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return Promise.resolve();
    }
    return Promise.resolve();
  };

  return { getItem, setItem, removeItem };
};
