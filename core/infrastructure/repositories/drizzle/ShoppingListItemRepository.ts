import { eq } from "drizzle-orm";

import type { IShoppingListItemRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListItemRepository";
import { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";

import { db } from "~~/core/infrastructure/drizzle/database";
import { shoppingItem } from "~~/core/infrastructure/drizzle/schema";

export class ShoppingListItemRepository implements IShoppingListItemRepository {
    async findById(id: string): Promise<ShoppingListItem | null> {
        const rows = await db.select().from(shoppingItem).where(eq(shoppingItem.id, id)).limit(1);

        const row = rows[0];

        if (!row) {
            return null;
        }

        return this.toDomain(row);
    }

    async findByListId(listId: string): Promise<ShoppingListItem[]> {
        const rows = await db.select().from(shoppingItem).where(eq(shoppingItem.listId, listId));

        return rows.map((row) => this.toDomain(row));
    }

    async save(item: ShoppingListItem): Promise<void> {
        await db
            .insert(shoppingItem)
            .values({
                id: item.getId(),
                listId: item.getListId(),
                name: item.getName(),
                notes: item.getNotes(),
                boughtQuantity: item.getBoughtQuantity(),
                unitPrice: Number(item.getUnitPrice()),
            })
            .onConflictDoUpdate({
                target: shoppingItem.id,
                set: {
                    listId: item.getListId(),
                    name: item.getName(),
                    notes: item.getNotes(),
                    boughtQuantity: item.getBoughtQuantity(),
                    unitPrice: Number(item.getUnitPrice()),
                },
            });
    }

    async delete(id: string): Promise<void> {
        await db.delete(shoppingItem).where(eq(shoppingItem.id, id));
    }

    async deleteByListId(listId: string): Promise<void> {
        await db.delete(shoppingItem).where(eq(shoppingItem.listId, listId));
    }

    private toDomain(row: typeof shoppingItem.$inferSelect): ShoppingListItem {
        return new ShoppingListItem({
            id: row.id,
            listId: row.listId,
            name: row.name,
            notes: row.notes,
            boughtQuantity: row.boughtQuantity,
            unitPrice: row.unitPrice,
        });
    }
}
