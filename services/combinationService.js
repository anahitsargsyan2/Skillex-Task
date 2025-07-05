/**
 * Generates items from items.
 * @param {number[]} items - Array of items, each index+1 is prefix
 * @returns {string[]} - Generated item names
 */
export function generateItemsFromCounts(items) {
  const generatedIetms = [];

  for (let prefixIndex = 0; prefixIndex < items.length; prefixIndex++) {
    const prefix = (prefixIndex + 1).toString();
    const count = items[prefixIndex];

    for (let i = 1; i <= count; i++) {
      generatedIetms.push(`${prefix}_${i}`);
    }
  }

  return generatedIetms;
}

/**
 * Generates all valid combinations of given length, with no duplicate prefixes.
 * @param {string[]} items - Array of item names
 * @param {number} combinationLength
 * @returns {string[][]}
 */
export function generateValidCombinations(items, combinationLength) {
  const results = [];

  function backtrack(startIndex, path, usedPrefixes) {
    if (path.length === combinationLength) {
      results.push([...path]);
      
      return;
    }

    for (let i = startIndex; i < items.length; i++) {
      const item = items[i];
      const prefix = item.split('_')[0]; 

      if (usedPrefixes.has(prefix)) continue;

      usedPrefixes.add(prefix);
      path.push(item);

      backtrack(i + 1, path, usedPrefixes);

      path.pop();
      usedPrefixes.delete(prefix);
    }
  }

  backtrack(0, [], new Set());

  return results;
}
