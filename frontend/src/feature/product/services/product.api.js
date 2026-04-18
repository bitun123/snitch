import axios from "axios";

const productApi = axios.create({
    baseURL: "/api/products",
    withCredentials: true,
})


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

export const getAllProducts = async () => {
    try {
        const response = await productApi.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
}