import express from "express";
import { Report } from "../controllers";

const router = express.Router();

router.get("/getById/:reportId", Report.getById);
router.get("/get", Report.get);

export = router;
