import express from "express";
import { Loan } from "../controllers";

const router = express.Router();

router.get("/getByReportId/:reportId", Loan.getByReportId);

export = router;
