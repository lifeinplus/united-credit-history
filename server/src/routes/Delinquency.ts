import express from "express";
import { Delinquency } from "../controllers";

const router = express.Router();

router.get("/getByLoanIds", Delinquency.getByLoanIds);

export = router;
