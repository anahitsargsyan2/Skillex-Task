import express from "express";
import { generateCombinations } from "../controllers/combinationController.js";

const router = express.Router();

router.post("/combinations", generateCombinations);

export default router;
