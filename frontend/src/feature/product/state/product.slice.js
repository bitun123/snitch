import {createSlice} from "@reduxjs/toolkit";

 const productSlice = createSlice({
name: "product",

initialState:{
    allSellerProducts: [],
    products:[],
    loading: false,
    error: null,
    productDetails: null
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
    },
    setProductDetails:(state, action) => {
        state.productDetails = action.payload;
    }

}});

export const {setAllSellerProducts, setLoading, setError, setProduct, setProductDetails} = productSlice.actions;
export default productSlice.reducer;