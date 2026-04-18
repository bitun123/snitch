
import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.services.js";

export const createProductController = async (req, res) => {

try {
    const {title, description, priceAmount,priceCurrency} = req.body;

    const seller = req.User._id;


    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({buffer:file.buffer,filName:file.originalname})
    })) 


    const product  = await productModel.create({
        title,
        description,
        price:{
            amount: priceAmount,
            currency:   priceCurrency || "INR",
        },
        seller:seller._id,
        images
    })
    


    res.status(201).json({
        message:"Product created successfully",
        product
    })
} catch (error) {
    res.status(500).json({
        message:"Error creating product",
        error
    })
}

}
