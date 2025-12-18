import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/autheSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer :{
        auth: authSlice
    }
});

export type AppDispatch = typeof store.dispatch

//entender isso
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()