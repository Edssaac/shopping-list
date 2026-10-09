export const SQLiteSchema = {
    version: 1,

    statements: [
        `
            CREATE TABLE IF NOT EXISTS shopping_list (
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                created_at TEXT NOT NULL,
                status TEXT NOT NULL
            );
        `,

        `
            CREATE TABLE IF NOT EXISTS shopping_item (
                id TEXT PRIMARY KEY NOT NULL,
                list_id TEXT NOT NULL,
                name TEXT NOT NULL,
                notes TEXT NOT NULL DEFAULT '',
                bought_quantity INTEGER NOT NULL DEFAULT 0,
                unit_price INTEGER NOT NULL,

                FOREIGN KEY (list_id)
                REFERENCES shopping_list(id)
                ON DELETE CASCADE
            );
        `,
    ],
};
