import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {user:"",isLoggdIn:false},
  reducers: {
    login(state){
      state.isLoggdIn=true
    },
     logout(state){
      state.isLoggdIn=false
      sessionStorage.removeItem("id");
    },
      hydrateAuth(state) {
      const storedUserId = sessionStorage.getItem("id");
      if (storedUserId ) {
        state.isLoggdIn = true;
      }
    }
  },
});

export const { login, logout, hydrateAuth } = authSlice.actions;

export const Store = configureStore({
  reducer: authSlice.reducer,
});