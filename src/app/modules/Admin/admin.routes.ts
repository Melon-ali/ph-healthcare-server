import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/", AdminController.getAllFromDB);
router.get('/:id', AdminController.getByIdFromDb)

export const adminRouter = router;
