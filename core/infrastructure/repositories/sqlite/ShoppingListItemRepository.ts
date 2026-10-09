import type { IShoppingListItemRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListItemRepository";
import { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";
import { SQLiteDatabase } from "~~/core/infrastructure/database/SQLiteDatabase";

interface ShoppingListItemRow {
    id: string;
    list_id: string;
    name: string;
    notes: string;
    bought_quantity: number;
    unit_price: number;
}

export class ShoppingListItemRepository implements IShoppingListItemRepository {
    constructor(private readonly database: SQLiteDatabase) {}

    async findById(id: string): Promise<ShoppingListItem | null> {
        const rows = await this.database.query<ShoppingListItemRow>(
            `
                SELECT
                    id,
                    list_id,
                    name,
                    notes,
                    bought_quantity,
                    unit_price
                FROM shopping_item
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

    async findByListId(listId: string): Promise<ShoppingListItem[]> {
        const rows = await this.database.query<ShoppingListItemRow>(
            `
                SELECT
                    id,
                    list_id,
                    name,
                    notes,
                    bought_quantity,
                    unit_price
                FROM shopping_item
                WHERE list_id = ?
                ORDER BY name
            `,
            [listId],
        );

        return rows.map((row) => this.toDomain(row));
    }

    async save(item: ShoppingListItem): Promise<void> {
        await this.database.run(
            `
                INSERT INTO shopping_item (
                    id,
                    list_id,
                    name,
                    notes,
                    bought_quantity,
                    unit_price
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    name = excluded.name,
                    notes = excluded.notes,
                    bought_quantity = excluded.bought_quantity,
                    unit_price = excluded.unit_price
            `,
            [
                item.getId(),
                item.getListId(),
                item.getName(),
                item.getNotes(),
                item.getBoughtQuantity(),
                item.getUnitPrice(),
            ],
        );
    }

    async delete(id: string): Promise<void> {
        await this.database.run(
            `
                DELETE FROM shopping_item
                WHERE id = ?
            `,
            [id],
        );
    }

    async deleteByListId(listId: string): Promise<void> {
        await this.database.run(
            `
                DELETE FROM shopping_item
                WHERE list_id = ?
            `,
            [listId],
        );
    }

    private toDomain(row: ShoppingListItemRow): ShoppingListItem {
        return new ShoppingListItem({
            id: row.id,
            listId: row.list_id,
            name: row.name,
            notes: row.notes,
            boughtQuantity: row.bought_quantity,
            unitPrice: row.unit_price,
        });
    }
}
