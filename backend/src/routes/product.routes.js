import {Router} from 'express';
import { authenticateSeller } from '../middleware/auth.middleware';
import { createProductController } from '../controller/product.controller.js';
const productRouter = Router();



productRouter.post("/", authenticateSeller, createProductController);

export default productRouter;