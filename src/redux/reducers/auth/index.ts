import {createSlice} from '@reduxjs/toolkit';

export type AuthType = {
  accessToken: string | null;
  user: any;
};

const initialState: AuthType = {
  accessToken: null,

  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    UpdateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    UpdateUser: (state, action) => {
      state.user = action.payload;
    },
    Logout: state => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const {UpdateAccessToken, UpdateUser, Logout} = authSlice.actions;

export default authSlice.reducer;
