import express from "express";
import { RequestCount } from "../controllers";

const router = express.Router();

router.get("/getByReportId/:reportId", RequestCount.getByReportId);

export = router;
