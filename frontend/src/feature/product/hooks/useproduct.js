import {createProduct,getAllSellerProducts,getAllPublicProducts} from "../services/product.api";
import {useDispatch} from "react-redux";
import { setAllSellerProducts, setLoading, setError,setProduct} from "../state/product.slice";

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


    return {createNewProduct, fetchAllProducts, getAllProducts };
}