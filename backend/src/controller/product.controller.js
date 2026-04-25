
import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.services.js";

//* Controller to create a new product */
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

//* Controller to get all products of a seller*/
export const getAllSellerProductsController = async (req, res) => {
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

//* Controller to get all products (public)*/
export const getAllProductsController = async (req, res) => {
try {
    const products = await productModel.find();

    if(!products){
        return res.status(404).json({
            message: "No products found",
            success: false
        })
    }

    res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })
} catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
        message: "Error fetching products",
        success: false,
        error: error.message
    });
}
}


//* Controller to get product details by ID */
export const getProductDetailsController = async (req,res)=>{
    const {productId} = req.params;
    try {
        const product = await productModel.findById(productId);

        if(!product){
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Product details fetched successfully",
            success: true,
            product
        })
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({
            message: "Error fetching product details",
            success: false,
            error: error.message
        });
    }
}