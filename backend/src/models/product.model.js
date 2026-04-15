import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide a title for this product"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"Please provide a description for this product"],
    },
    seller:{
        Type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Please provide a seller for this product"],
    },
    price:{
        amount:{
            type:Number,
            required:[true,"Please provide a price for this product"],
        },
        currency:{
            type:String,
          enum:["USD","EUR","GBP","JPY","CNY","INR"],
    default:"INR",
        },
     
    },
    images:[
        {
            url:{
                type:String,
                required:[true,"Please provide an image url for this product"],
            },
            alt:{
                type:String,
                required:[true,"Please provide an alt text for this image"],
            }
        }
    ]

},{
    timestamps:true,
})

const productModel = mongoose.model("Product",productSchema);
export default productModel;