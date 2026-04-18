import {Router} from 'express';
import { authenticateSeller } from '../middleware/auth.middleware.js';
import { createProductController } from '../controller/product.controller.js';
import { upload } from '../middleware/multer.js';
import {productCreationValidationRules} from '../validator/product.validator.js';

const productRouter = Router();


/**@
 * @route POST /api/products
 * @desc Create a new product
 * @access Private (Seller only)
 * @body { name: String, description: String, price: Number, category: String, images: Array of Files }
 */
productRouter.post("/create/product", authenticateSeller,productCreationValidationRules, upload.array("images", 5), createProductController);


/**@
 * @route GET /api/products
 * @desc Get all products with pagination and filtering
 * @access Public
 * @query { page: Number, limit: Number, category: String, priceRange: String }
 */

productRouter.get("/products",authenticateSeller, getAllProductsController);

export default productRouter;