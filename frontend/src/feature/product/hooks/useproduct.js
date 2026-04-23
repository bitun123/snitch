import {createProduct,getAllProducts} from "../services/product.api";
import {useDispatch} from "react-redux";
import { setAllProducts, setLoading, setError} from "../state/product.slice";

export const useProduct = () => {
    const dispatch = useDispatch();

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

    async function fetchAllProducts() {
        try {
            dispatch(setLoading(true));
            console.log("Fetching all products...");
            const data = await getAllProducts();
            dispatch(setAllProducts(data));
        } catch (error) {
            
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        
        }
    }
    return {createNewProduct, fetchAllProducts};
}