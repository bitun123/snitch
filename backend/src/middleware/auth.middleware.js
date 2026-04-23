import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";


//* Middleware to authenticate sellers */
export const authenticateSeller = async (req, res, next) => {
const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
if(user.role !== "seller"){
    return res.status(403).json({ message: "Forbidden" });
}


    req.user = user;
    next();

} catch (error) {
    console.error("Error in authenticateSeller middleware:", error);
   return  res.status(401).json({ message: "Unauthorized" });
}


}


//* Middleware to authenticate buyers */
export const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token; 

    if(!token){
        return res.status(401).json({ message: "Unauthorized" });
    }

    let decode;
    try {
      decode = jwt.verify(token, config.JWT_SECRET);

      const user = await userModel.findById(decode.id);

      if(!user){
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in authenticateBuyer middleware:", error);
      return res.status(401).json({ message: "Unauthorized" });
    }

}

