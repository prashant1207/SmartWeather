import AsyncStorage from '@react-native-async-storage/async-storage';
const kCities = 'CITIES';

export async function storeData(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('[AsyncStorage] Failed storeData.', e);
  }
}

export async function getData<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('[AsyncStorage] Failed getData.', e);
  }

  return null;
}

export async function storeCities(cities: string[]): Promise<void> {
  await storeData(kCities, JSON.stringify(cities));
}

export async function getCities(): Promise<string[] | null> {
  return await getData<string[]>(kCities);
}
