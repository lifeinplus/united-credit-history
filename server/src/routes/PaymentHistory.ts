import express from "express";
import { PaymentHistory } from "../controllers";

const router = express.Router();

router.get("/getByLoanIds", PaymentHistory.getByLoanIds);

export = router;
