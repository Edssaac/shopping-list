import type { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import type { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";
import type { ShoppingListStatusType } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";

import type { ShoppingListDataSource } from "./ShoppingListDataSource";

import { getSQLiteDependencies } from "~~/core/infrastructure/dependencies/createDependencies";

export class SQLiteShoppingListDataSource implements ShoppingListDataSource {
    private readonly dependencies = getSQLiteDependencies();

    async initialize(): Promise<void> {
        await this.dependencies.initializer.initialize();
    }

    async loadLists(): Promise<ShoppingList[]> {
        return await this.dependencies.listShoppingLists.execute();
    }

    async getList(id: string): Promise<ShoppingList | null> {
        try {
            return await this.dependencies.getShoppingList.execute(id);
        } catch {
            return null;
        }
    }

    async createList(name = "Nova Lista"): Promise<ShoppingList> {
        return await this.dependencies.createShoppingList.execute({
            name,
        });
    }

    async updateList(input: { id: string; name: string; status: ShoppingListStatusType }): Promise<ShoppingList> {
        return await this.dependencies.updateShoppingList.execute({
            id: input.id,
            name: input.name,
            status: input.status,
        });
    }

    async duplicateList(id: string, name?: string): Promise<ShoppingList> {
        const list = await this.dependencies.duplicateShoppingList.execute({
            id,
            name,
        });

        return await this.dependencies.getShoppingList.execute(list.getId());
    }

    async deleteList(id: string): Promise<void> {
        await this.dependencies.deleteShoppingList.execute(id);
    }

    async addItem(item: ShoppingListItem): Promise<ShoppingListItem> {
        return await this.dependencies.addShoppingListItem.execute({
            listId: item.getListId(),
            name: item.getName(),
            notes: item.getNotes(),
            boughtQuantity: item.getBoughtQuantity(),
            unitPrice: item.getUnitPrice(),
        });
    }

    async updateItem(item: ShoppingListItem): Promise<ShoppingListItem> {
        return await this.dependencies.updateShoppingListItem.execute({
            id: item.getId(),
            name: item.getName(),
            notes: item.getNotes(),
            boughtQuantity: item.getBoughtQuantity(),
            unitPrice: item.getUnitPrice(),
        });
    }

    async removeItem(itemId: string): Promise<void> {
        await this.dependencies.removeShoppingListItem.execute(itemId);
    }
}
