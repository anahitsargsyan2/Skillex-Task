import { pool } from "../database.js";
import { generateItemsFromCounts, generateValidCombinations } from "../services/combinationService.js";

export async function generateCombinations(req, res) {
    const { items, length } = req.body;

    const generatedItems = generateItemsFromCounts(items);
    const combinations = generateValidCombinations(generatedItems, length);

     res.json({
        generatedItems,
        combinations,
    });
}
