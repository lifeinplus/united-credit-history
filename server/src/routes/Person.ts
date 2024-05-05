import express from "express";
import { Person } from "../controllers";

const router = express.Router();

router.get("/getByReportId/:reportId", Person.getByReportId);

export = router;
