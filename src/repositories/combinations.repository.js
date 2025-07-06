import { COMBINATIONS } from "../constants/table-names.js";

export async function insertCombinations(client, combinations, combinationDetailsId) {
    const combinationsJson = JSON.stringify(combinations);

    const result = await client.query(
        `
        INSERT INTO ${COMBINATIONS} (combination, combination_details_id)
        VALUES ($1, $2)
        RETURNING id, combination
        `,
        [combinationsJson, combinationDetailsId]
    );

    return result.rows[0];
}   
