import express from "express";
import { Flc } from "../controllers";

const router = express.Router();

router.get("/getByLoanIds", Flc.getByLoanIds);

export = router;
