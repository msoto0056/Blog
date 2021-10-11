import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// for React use useLocalStorage  custom hook

const getSavedValue = async (key, initialValue) => {
  try {
    const savedValue = await AsyncStorage.getItem(key);
    if (savedValue !== null) {
      return savedValue instanceof String ? savedValue : JSON.parse(savedValue);
    }
  } catch (e) {
    console.log('caught error', e);
  }
  return initialValue;
};

const storeData = async (key, value) => {
  try {
    const storeValue = value instanceof String ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, storeValue);
  } catch (e) {
    // saving error
  }
};

export default function useAsyncStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });
  useEffect(() => {
    storeData(key, value);
  }, [key,value]);

  return [value, setValue];
}
