import express from 'express';
import { generateCombinations } from '../controllers/combination.controller.js';
import { validateCombinationRequest } from '../middlewares/combination.middleware.js';

const router = express.Router();

router.post('/combinations', validateCombinationRequest, generateCombinations);

export default router;
