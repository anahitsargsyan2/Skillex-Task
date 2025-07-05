import { COMBINATION_DETAILS } from "../constants/tableNames.js";

export async function insertCombinationDetails(client, items, length) {
    const itemsText = items.join();

   const result = await client.query(
    `
    INSERT INTO ${COMBINATION_DETAILS} (items, length)
    VALUES ($1, $2)
    RETURNING id
    `,
    [itemsText, length]
  );

  return result.rows[0]; 
}   