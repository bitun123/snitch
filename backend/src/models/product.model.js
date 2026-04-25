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
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
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
            }
        }
    ],
    variants:[
        {
            images:[
                {
                    url:{
                        type:String,
                        required:[true,"Please provide an image url for this product variant"],
                    }
                }
            ],
            stock:{
                type:Number,
                required:[true,"Please provide a stock for this product variant"],
                default:0,
            },
            attributes:{
                type:Map,
                of:String,
            },
            price:{
                amount:{
                    type:Number,
                    required:[true,"Please provide a price for this product variant"],
                },
                currency:{
                    type:String,
                    enum:["USD","EUR","GBP","JPY","CNY","INR"],
                    default:"INR",
                },
            }
        }
    ]

},{
    timestamps:true,
})

const productModel = mongoose.model("Product",productSchema);
export default productModel;