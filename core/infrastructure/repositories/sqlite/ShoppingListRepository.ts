import { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import type { ShoppingListStatusType } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";
import type { IShoppingListRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListRepository";
import { SQLiteDatabase } from "~~/core/infrastructure/database/SQLiteDatabase";

interface ShoppingListRow {
    id: string;
    name: string;
    created_at: string;
    status: string;
}

export class ShoppingListRepository implements IShoppingListRepository {
    constructor(private readonly database: SQLiteDatabase) {}

    async findAll(): Promise<ShoppingList[]> {
        const rows = await this.database.query<ShoppingListRow>(`
            SELECT
                id,
                name,
                created_at,
                status
            FROM shopping_list
            ORDER BY created_at DESC
        `);

        return rows.map((row) => this.toDomain(row));
    }

    async findById(id: string): Promise<ShoppingList | null> {
        const rows = await this.database.query<ShoppingListRow>(
            `
                SELECT
                    id,
                    name,
                    created_at,
                    status
                FROM shopping_list
                WHERE id = ?
                LIMIT 1
            `,
            [id],
        );

        if (!rows[0]) {
            return null;
        }

        return this.toDomain(rows[0]);
    }

    async save(shoppingListEntity: ShoppingList): Promise<void> {
        await this.database.run(
            `
                INSERT INTO shopping_list (
                    id,
                    name,
                    created_at,
                    status
                )
                VALUES (?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    name = excluded.name,
                    status = excluded.status
            `,
            [
                shoppingListEntity.getId(),
                shoppingListEntity.getName(),
                shoppingListEntity.getCreatedAt(),
                shoppingListEntity.getStatus(),
            ],
        );
    }

    async delete(id: string): Promise<void> {
        await this.database.run(
            `
                DELETE FROM shopping_list
                WHERE id = ?
            `,
            [id],
        );
    }

    private toDomain(row: ShoppingListRow): ShoppingList {
        return new ShoppingList({
            id: row.id,
            name: row.name,
            createdAt: row.created_at,
            status: row.status as ShoppingListStatusType,
        });
    }
}
