import {createSlice} from '@reduxjs/toolkit';
 
export type MessageType = {
  message: string;
  status?: 'info' | 'success' | 'error' | 'warning';
  delay?: number;
};

type MessageStoreType = {
  message: null | MessageType;
};

const initialState: MessageStoreType = {
  message: null,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    UpdateMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {UpdateMessage} = messageSlice.actions;

export default messageSlice.reducer;
