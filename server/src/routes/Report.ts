import express from "express";
import controller from "../controllers/Report";

const router = express.Router();

router.get("/get/:reportId", controller.read);
router.get("/get", controller.readAll);

export = router;
