import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { LoginCredentials, simulateLogin } from '@/service/api';
import * as storage from '@/service/storage';

export interface AuthState{
    token : string|null,
    status: "idle"| 'authenticated',
    isLoading: boolean;
    isLoadingFromStorage: boolean;
    error: string|null; 
}

const initialState: AuthState = {
    status : 'idle',
    token: null,
    isLoading: false,
    isLoadingFromStorage: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      clearError(state){
        state.error = null;
      }
    }, 
    extraReducers: (builder)=> {
        builder.addCase(login.pending, (state)=>{
            state.isLoading = true;
           
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<string>)=>{
            state.isLoading = false;
            state.token = action.payload;
            state.status = 'authenticated';
            state.error = null;
        }); 
        builder.addCase(login.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload as string;
        });

        builder.addCase(loadUserFromStorage.pending, (state)=>{
            state.isLoadingFromStorage = true;
        });
        builder.addCase(loadUserFromStorage.fulfilled, (state, action: PayloadAction<string | null>)=>{
            state.isLoadingFromStorage = false;
            state.token = action.payload;
            if(action.payload){
                state.status = 'authenticated';
            }
        });
        builder.addCase(loadUserFromStorage.rejected, (state)=>{
            state.isLoadingFromStorage = false;
        });

        builder.addCase(logout.fulfilled, (state)=>{
            state.token = null;
            state.status = 'idle';
        });
    }
});

export const login = createAsyncThunk<string, LoginCredentials>(
    'auth/login',
    async (credentials, { rejectWithValue })=>{
        try{
            const token = await simulateLogin(credentials);
            await storage.saveToken(token);
            return token;
        }catch(e :any){
            return  rejectWithValue(e.message || "Erro desconhecido");
        }
    }
)

export const loadUserFromStorage = createAsyncThunk<string | null, void>(
    'auth/loadUserFromStorage',
    async () => {
        const token = await storage.getToken();
        return token;
    }
);

export const logout = createAsyncThunk(
    'auth/logout', async () => {
    await storage.removeToken();
});

export const { clearError } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer
