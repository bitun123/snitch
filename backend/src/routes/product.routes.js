import {Router} from 'express';
import { authenticateSeller } from '../middleware/auth.middleware.js';
import { createProductController } from '../controller/product.controller.js';
import { upload } from '../middleware/multer.js';
import {productCreationValidationRules} from '../validator/product.validator.js';

const productRouter = Router();



productRouter.post("/", authenticateSeller,productCreationValidationRules, upload.array("images", 5), createProductController);

export default productRouter;