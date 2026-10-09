import { drizzle } from "drizzle-orm/node-sqlite";
import { DatabaseSync } from "node:sqlite";

const sqlite = new DatabaseSync("./core/infrastructure/database/database.db");

export const db = drizzle({
    client: sqlite,
});
