import {Router} from 'express';
import { authenticateSeller } from '../middleware/auth.middleware.js';
import { createProductController } from '../controller/product.controller.js';
const productRouter = Router();



productRouter.post("/", authenticateSeller, createProductController);

export default productRouter;