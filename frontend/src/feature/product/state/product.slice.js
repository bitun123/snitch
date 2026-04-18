import {createSlice} from "@reduxjs/toolkit";

 const productSlice = createSlice({
name: "product",

initialState:{
    allProducts: [],
    loading: false,
    error: null,
},

reducers:{

    setAllProducts: (state, action) => {
        state.allProducts = action.payload;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload;
    },

}});

export const {setAllProducts, setLoading, setError} = productSlice.actions;
export default productSlice.reducer;