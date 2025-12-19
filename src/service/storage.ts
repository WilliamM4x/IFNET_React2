import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@app/token';

export async function saveToken( value:string){
    await AsyncStorage.setItem(TOKEN_KEY, value);
}

export async function getToken(){
    const value = await AsyncStorage.getItem(TOKEN_KEY);
    return value;
}

export async function removeToken(){
    await AsyncStorage.removeItem(TOKEN_KEY);
}