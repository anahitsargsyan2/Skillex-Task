import express from "express";
import dotenv from "dotenv";
import combinationRoutes from "./src/routes/combinationRoutes.js";
import healthRoutes from "./src/routes/healthRoutes.js";
import pool, { initializeTables } from "./database.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", combinationRoutes);

app.use("/api", healthRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    initializeTables();
});
