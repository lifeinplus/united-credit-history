import express from "express";
import { Common } from "../controllers";

const router = express.Router();

router.get("/getByReportId/:reportId", Common.getByReportId);

export = router;
