
import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.services.js";

export const createProductController = async (req, res) => {

    try {

        const { title, description, priceAmount, priceCurrency } = req.body;


        const seller = req.user._id;

        if (!seller) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            })
        }

        const images = await Promise.all(req.files.map(async (file) => {


            return await uploadFile({ buffer: file.buffer, fileName: file.originalname })
        })) 


        console.log(images)

        const product = await productModel.create({
            title,
            description,
            price: {
                amount: priceAmount,
                currency: priceCurrency || "INR",
            },
            seller: seller,
            images
        })




        res.status(201).json({
            message: "Product created successfully",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error creating product",
            error
        })
    }

}


export const getAllProductsController = async (req, res) => {
    try {
        const sellerId = req.user._id;

        if (!sellerId) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        console.log("Fetching products for seller:", sellerId); // ✅ fixed

        const products = await productModel.find({ seller: sellerId }); // ✅ fixed

        res.status(200).json({
            message: "Products fetched successfully",
            products
        });

    } catch (error) {
        console.error("Error fetching products:", error);

        return res.status(500).json({
            message: "Error fetching products",
            error: error.message
        });
    }
};