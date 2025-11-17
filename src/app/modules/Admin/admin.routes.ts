import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/", AdminController.getAllFromDB);
router.get('/:id', AdminController.getByIdFromDb)
router.patch('/:id', AdminController.updateIntoDB)

export const adminRouter = router;
