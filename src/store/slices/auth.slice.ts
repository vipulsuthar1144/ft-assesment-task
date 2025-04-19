import { createSlice } from "@reduxjs/toolkit";
import { AuthAPI } from "@store/thunk-services/auth.thunk";

interface IAuthSlice {
  isSignInLoading: boolean;
  isSignInError: boolean;
}

const intialState: IAuthSlice = {
  isSignInLoading: false,
  isSignInError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AuthAPI.signIn.pending, state => {
        state.isSignInLoading = true;
        state.isSignInError = false;
      })
      .addCase(AuthAPI.signIn.fulfilled, state => {
        state.isSignInLoading = false;
        state.isSignInError = false;
      })
      .addCase(AuthAPI.signIn.rejected, state => {
        state.isSignInLoading = false;
        state.isSignInError = true;
      });
  },
});

export default authSlice.reducer;
