export function validateCombinationRequest(req, res, next) {
  const { items, length } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "`items` must be an array" });
  }

  if (!items.every((i) => typeof i === "number")) {
    return res.status(400).json({ error: "All elements of `items` must be numbers" });
  }

  if (typeof length !== "number") {
    return res.status(400).json({ error: "`length` must be a number" });
  }

  next();
}
