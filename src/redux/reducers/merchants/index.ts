import {createSlice} from '@reduxjs/toolkit';

export type MerchantsType = {
    merchants: any[],
    merchantsSelected: any[]
};
const initialState: MerchantsType = {
    merchants: [],
    merchantsSelected: []
};

export const merchantsSlice = createSlice({
    name: 'merchants',
    initialState,
    reducers: {
        UpdateMerchants: (state, action) => {
            state.merchants = action.payload;
        },
        UpdateMerchantsSelected: (state, action) => {
            state.merchantsSelected = action.payload;
        },
    },
});

export const {UpdateMerchants, UpdateMerchantsSelected} = merchantsSlice.actions;

export default merchantsSlice.reducer;
