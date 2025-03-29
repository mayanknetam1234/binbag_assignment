import express from "express"
import { signUp,logout, updateProfile, getProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const router=express.Router();

router.post("/signup",signUp);
router.get("/logout",protectRoute,logout)
router.put("/update-profile",protectRoute,updateProfile)
router.get("/get-profile",protectRoute,getProfile)

export default router