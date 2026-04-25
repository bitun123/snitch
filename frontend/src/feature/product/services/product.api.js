import axios from "axios";


// Create an Axios instance for product-related API calls
const productApi = axios.create({
    baseURL: "/api/products",
    withCredentials: true,
})

// API function to create a new product
export const createProduct = async (productData) => {


    try {
        const response = await productApi.post("/create/product", productData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;

    }
}


// API function to get all products of a seller
export const getAllSellerProducts = async () => {
    try {
        const response = await productApi.get("/get-all-products");
        return response.data;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
}


// API function to get all products (public)
export const getAllPublicProducts = async () => {
    try {
        const response = await productApi.get("/");
        return response.data;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
}


// API function to get product details by ID
export const getProductDetails = async (productId) => {
    try {
        const response = await productApi.get(`/details/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
    }
}