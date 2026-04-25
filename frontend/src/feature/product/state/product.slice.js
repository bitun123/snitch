import {createSlice} from "@reduxjs/toolkit";

 const productSlice = createSlice({
name: "product",

initialState:{
    allSellerProducts: [],
    products:[],
    loading: false,
    error: null,
},

reducers:{

    setAllSellerProducts: (state, action) => {
        state.allSellerProducts = action.payload;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload;
    },
    setProduct:(state, action) => {
        state.products = action.payload;
    }

}});

export const {setAllSellerProducts, setLoading, setError, setProduct} = productSlice.actions;
export default productSlice.reducer;