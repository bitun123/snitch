import Imagekit from "@imagekit/nodejs";
import { config } from "../config/config.js";


const client = new Imagekit({
    privateKey: config.IMAGEKIT_API_KEY,
})


export async function uploadFile({buffer,filName,folder="snitch"}){


    try {
        const result = await client.files.upload({
            file:await Imagekit.toFile(buffer),
            fileName:filName,
            folder:folder
        })

        return result;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}