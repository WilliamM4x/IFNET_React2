import AsyncStorage from '@react-native-async-storage/async-storage';

export async function save(hey:string, value:string){
    await AsyncStorage.setItem(hey, value);
}

export async function get(key:string){
    const value = await AsyncStorage.getItem(key);
    return value;
}