import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        console.log(token);
    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        // Check token and it is decode the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        // through this line you get the database user access 
        const user = await User.findById(decodedToken?._id).
        select("-password -refreshToken");
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
    
        req.user = user
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token");
    }
});