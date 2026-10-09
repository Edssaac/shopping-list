import { SQLiteDatabase } from "./SQLiteDatabase";
import { SQLiteSchema } from "./SQLiteSchema";

export class DatabaseInitializer {
    constructor(private readonly database: SQLiteDatabase) {}

    async initialize(): Promise<void> {
        await this.database.open();

        for (const statement of SQLiteSchema.statements) {
            await this.database.execute(statement);
        }
    }
}
