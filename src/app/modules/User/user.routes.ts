import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();


router.post("/", auth("admin"), userController.createAdmin);

export const userRoutes = router;
