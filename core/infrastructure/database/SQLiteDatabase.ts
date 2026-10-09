import { CapacitorSQLite, SQLiteConnection, type SQLiteDBConnection } from "@capacitor-community/sqlite";

export class SQLiteDatabase {
    private readonly sqlite: SQLiteConnection;

    private db: SQLiteDBConnection | null = null;

    constructor(private readonly databaseName: string) {
        this.sqlite = new SQLiteConnection(CapacitorSQLite);
    }

    async open(): Promise<void> {
        const consistency = await this.sqlite.checkConnectionsConsistency();

        const isConnection = await this.sqlite.isConnection(this.databaseName, false);

        if (consistency.result && isConnection.result) {
            this.db = await this.sqlite.retrieveConnection(this.databaseName, false);
        } else {
            this.db = await this.sqlite.createConnection(this.databaseName, false, "no-encryption", 1, false);
        }

        await this.db.open();
    }

    async close(): Promise<void> {
        if (!this.db) {
            return;
        }

        await this.db.close();

        this.db = null;
    }

    async execute(sql: string): Promise<void> {
        const db = this.getConnection();

        await db.execute(sql);
    }

    async run(sql: string, values: unknown[] = []): Promise<void> {
        const db = this.getConnection();

        await db.run(sql, values);
    }

    async query<T>(sql: string, values: unknown[] = []): Promise<T[]> {
        const db = this.getConnection();

        const result = await db.query(sql, values);

        return (result.values ?? []) as T[];
    }

    async beginTransaction(): Promise<void> {
        const db = this.getConnection();

        await db.beginTransaction();
    }

    async commitTransaction(): Promise<void> {
        const db = this.getConnection();

        await db.commitTransaction();
    }

    async rollbackTransaction(): Promise<void> {
        const db = this.getConnection();

        await db.rollbackTransaction();
    }

    private getConnection(): SQLiteDBConnection {
        if (!this.db) {
            throw new Error("SQLite database is not open.");
        }

        return this.db;
    }
}
