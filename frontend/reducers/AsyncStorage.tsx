import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: any, nameStorage: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(nameStorage, jsonValue);
    // console.log(value);
    console.log('Data successfully saved');
  } catch (e) {
    console.log('Failed to save the data to the storage');
  }
};

export const retrieveData = async (nameStorage: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(nameStorage);
    const data = jsonValue != null ? JSON.parse(jsonValue) : [];
    console.log('Data successfully retrieved');
    // console.log(data);
    return data;
  } catch (e) {
    console.log('Failed to retrieve the data from storage');
  }
};

export const nameStorage = {
  jwtToken: 'jwtToken',
  isLogin: 'isLogin',
};
