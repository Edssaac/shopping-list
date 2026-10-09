import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./core/infrastructure/drizzle/schema.ts",
    out: "./core/infrastructure/drizzle/migrations",
    dbCredentials: {
        url: "./core/infrastructure/database/database.db",
    },
});
