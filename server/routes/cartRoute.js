import mongoose from "mongoose";
import authUser from "../middleware/authUser";
import { updateCart } from "../controllers/cartController";


const cartRouter = mongoose.Router();

cartRouter.post('/update', authUser, updateCart)

export default cartRouter