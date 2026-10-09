import { eq } from "drizzle-orm";

import type { IShoppingListRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListRepository";
import { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import type { ShoppingListStatusType } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";

import { db } from "~~/core/infrastructure/drizzle/database";
import { shoppingList } from "~~/core/infrastructure/drizzle/schema";

export class ShoppingListRepository implements IShoppingListRepository {
    async findAll(): Promise<ShoppingList[]> {
        const rows = await db.select().from(shoppingList);

        return rows.map((row) => this.toDomain(row));
    }

    async findById(id: string): Promise<ShoppingList | null> {
        const rows = await db.select().from(shoppingList).where(eq(shoppingList.id, id)).limit(1);

        const row = rows[0];

        if (!row) {
            return null;
        }

        return this.toDomain(row);
    }

    async save(shoppingListEntity: ShoppingList): Promise<void> {
        await db
            .insert(shoppingList)
            .values({
                id: shoppingListEntity.getId(),
                name: shoppingListEntity.getName(),
                createdAt: shoppingListEntity.getCreatedAt(),
                status: shoppingListEntity.getStatus(),
            })
            .onConflictDoUpdate({
                target: shoppingList.id,
                set: {
                    name: shoppingListEntity.getName(),
                    status: shoppingListEntity.getStatus(),
                },
            });
    }

    async delete(id: string): Promise<void> {
        await db.delete(shoppingList).where(eq(shoppingList.id, id));
    }

    private toDomain(row: typeof shoppingList.$inferSelect): ShoppingList {
        return new ShoppingList({
            id: row.id,
            name: row.name,
            createdAt: row.createdAt,
            status: row.status as ShoppingListStatusType,
        });
    }
}
