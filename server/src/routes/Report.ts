import express from "express";
import { Report } from "../controllers";

const router = express.Router();

router.get("/getById/:reportId", Report.getById);
router.get("/getAll", Report.getAll);

export = router;
