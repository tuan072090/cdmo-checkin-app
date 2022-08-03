import {createSlice} from '@reduxjs/toolkit';

export type MerchantsType = {
    merchants: any[]
};
const initialState: MerchantsType = {
    merchants: []
};

export const merchantsSlice = createSlice({
    name: 'merchants',
    initialState,
    reducers: {
        UpdateMerchants: (state, action) => {
            state.merchants = action.payload;
        },
    },
});

export const {UpdateMerchants} = merchantsSlice.actions;

export default merchantsSlice.reducer;
