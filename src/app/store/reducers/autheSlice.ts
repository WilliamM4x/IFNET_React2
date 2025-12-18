import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { get, save } from '@/utils/async-storage';

export interface AuthState{
    token : string|null,
    status: "idle"| 'autheticaded'
}

const initialState: AuthState = {
    status : 'idle',
    token: await get('token') as unknown as string|null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action:PayloadAction<string>){

            save('token', action.payload);

            state.token = action.payload;
            state.status = 'autheticaded'
        },
        logout(state){
            save('token', '');

            state.token= null;
            state.status='idle'
        }
    }
});

export const { login, logout } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer
