import {createProduct,getAllSellerProducts,getAllPublicProducts ,getProductDetails} from "../services/product.api";
import {useDispatch} from "react-redux";
import { setAllSellerProducts, setLoading, setError,setProduct, setProductDetails} from "../state/product.slice";

export const useProduct = () => {
    const dispatch = useDispatch();

    // Function to create a new product
    async function createNewProduct(productData) {
      try {
        dispatch(setLoading(true));
      const data =   await createProduct(productData);
      return data.product

      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }


    // Function to fetch all products of a seller
    async function fetchAllProducts() {
        try {
            dispatch(setLoading(true));
            console.log("Fetching all products...");
            const data = await getAllSellerProducts();
            dispatch(setAllSellerProducts(data));
        } catch (error) {
            
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        
        }
    }


    // Function to fetch all products (public)
    async function getAllProducts() {
      try {
        dispatch(setLoading(true));
        const data = await getAllPublicProducts();
        dispatch(setProduct(data.products));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }

    }


    // Function to fetch product details by ID

    async function handleProductDetails(productId) {
      try {
        dispatch(setLoading(true));
        const data = await getProductDetails(productId);
        dispatch(setProductDetails(data.product));
      } catch (error) {
        console.error("Error fetching product details:", error);
        dispatch(setError(error.message));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    }

    return {createNewProduct, fetchAllProducts, getAllProducts, handleProductDetails};
}