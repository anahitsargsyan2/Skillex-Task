import pool from "../../database.js";
import { insertCombinationDetails } from "../repositories/combinationDetailsRepository.js";
import { insertCombinations } from "../repositories/combinationsRepositry.js";
import { generateItemsFromCounts, generateValidCombinations } from "../services/combinationService.js";

export async function generateCombinations(req, res) {
  const { items, length } = req.body;


  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const generatedItems = generateItemsFromCounts(items);

    const combinationDetails = await insertCombinationDetails(client, generatedItems, length);

    const generatedCombinations = generateValidCombinations(generatedItems, length);

    const combinations = await insertCombinations(client, generatedCombinations, combinationDetails.id);

    await client.query("COMMIT");

    res.json(combinations);

  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: "Database error"});
    console.log(err);
  } finally {
    client.release();
  }
}
