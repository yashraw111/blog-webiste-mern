import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controller/user.controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";
import { onlyadmin } from "../middleware/onlyadmin.js";

const UserRoute = express.Router();
// UserRoute.use(authenticate)
UserRoute.get("/get-user/:userid", authenticate,getUser);
UserRoute.put("/update-user/:userid",authenticate, upload.single("file"), updateUser);
UserRoute.get('/get-all-user',authenticate, getAllUser)
UserRoute.delete('/delete/:id',onlyadmin, deleteUser)
export default UserRoute;