import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/autheSlice'

export const store = configureStore({
    reducer :{
        auth: authSlice
    }
});

//entender isso
export type RootState = ReturnType<typeof store.getState>