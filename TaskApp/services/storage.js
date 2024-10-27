import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error('Failed to save object', e);
    }
};

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Failed to retrieve data', e);
    }
};

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('Data removed');
    } catch (e) {
        console.error('Failed to remove data', e);
    }
};

export const clearData = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Data clear');
    } catch (e) {
        console.error('Failed to clear data', e);
    }
}