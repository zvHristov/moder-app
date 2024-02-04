import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signUp, signIn, logOut } from 'features/auth/by-oauth';

export interface AuthStateI {
    auth: any;
    loading: boolean;
    error: null | string;
    succes: boolean;
}

const initialState: AuthStateI = {
    auth: {},
    loading: false,
    error: null,
    succes: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
            state.auth = action.payload;
            state.loading = false;
            state.succes = true;
        })
        .addCase(signUp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'faild';
          })
        builder.addCase(signIn.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
            state.auth = action.payload;
            state.loading = false;
            state.succes = true;
        })
        .addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'faild';
          })
        builder.addCase(logOut.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        builder.addCase(logOut.fulfilled, (state, action: PayloadAction<any>) => {
            state.auth = {};
            state.loading = false;
            state.succes = true;
        })
        .addCase(logOut.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.error.message || 'faild';
        })
    }
})

export default authSlice.reducer;