import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
// Importe o auth do firebase e a função de login
import { auth } from '@/service/firebaseConfig'; 
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { LoginCredentials } from '@/service/api'; // Certifique-se que essa interface tem email e password

// Ajuste a interface para guardar dados úteis do usuário, não só o token
export interface AuthState {
    user: { uid: string; email: string | null } | null;
    token: string | null;
    status: "idle" | 'authenticated' | 'failed';
    isLoading: boolean;
    error: string | null; 
}

const initialState: AuthState = {
    status: 'idle',
    user: null,
    token: null,
    isLoading: false,
    error: null
}

export const login = createAsyncThunk<
    { uid: string; email: string | null; token: string }, 
    LoginCredentials 
>(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
  
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const token = await user.getIdToken();

            return { 
                uid: user.uid, 
                email: user.email,
                token
            };
        } catch (error: any) {

            let msg = "Erro desconhecido";
            if (error.code === 'auth/invalid-credential') msg = "E-mail ou senha incorretos.";
            if (error.code === 'auth/invalid-email') msg = "E-mail inválido.";
            return rejectWithValue(msg);
        }
    }
);

// THUNK DE LOGOUT
export const logout = createAsyncThunk(
    'auth/logout', 
    async () => {
        await signOut(auth);
       
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      clearError(state){
        state.error = null;
      },
      setUser(state, action: PayloadAction<{ uid: string; email: string | null; token: string }>){
          state.user = { uid: action.payload.uid, email: action.payload.email };
          state.token = action.payload.token;
          state.status = 'authenticated';
      }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = 'authenticated';
                state.token = action.payload.token;
                state.user = { uid: action.payload.uid, email: action.payload.email };
            }) 
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.status = 'idle';
            });
    }
});

export const { clearError, setUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;