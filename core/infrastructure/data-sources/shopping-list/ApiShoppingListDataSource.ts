import { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";
import type { ShoppingListStatusType } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";

import type { ShoppingListDataSource } from "./ShoppingListDataSource";

interface ApiShoppingListItem {
    id: string;
    listId: string;
    name: string;
    notes: string;
    boughtQuantity: number;
    unitPrice: number;
}

interface ApiShoppingList {
    id: string;
    name: string;
    createdAt: string;
    status: string;
    items: ApiShoppingListItem[];
}

function toDomainItem(item: ApiShoppingListItem): ShoppingListItem {
    return new ShoppingListItem({
        id: item.id,
        listId: item.listId,
        name: item.name,
        notes: item.notes,
        boughtQuantity: item.boughtQuantity,
        unitPrice: item.unitPrice,
    });
}

function toDomainList(list: ApiShoppingList): ShoppingList {
    return new ShoppingList({
        id: list.id,
        name: list.name,
        createdAt: list.createdAt,
        status: list.status as ShoppingListStatusType,
        items: list.items.map(toDomainItem),
    });
}

export class ApiShoppingListDataSource implements ShoppingListDataSource {
    async initialize(): Promise<void> {}

    async loadLists(): Promise<ShoppingList[]> {
        const lists = await $fetch<ApiShoppingList[]>("/api/shopping-lists");

        return lists.map((list) => {
            return toDomainList(list);
        });
    }

    async getList(id: string): Promise<ShoppingList | null> {
        try {
            const list = await $fetch<ApiShoppingList>(`/api/shopping-lists/${id}`);

            return toDomainList(list);
        } catch {
            return null;
        }
    }

    async createList(name = "Nova Lista"): Promise<ShoppingList> {
        const list = await $fetch<ApiShoppingList>("/api/shopping-lists", {
            method: "POST",
            body: {
                name,
            },
        });

        return toDomainList(list);
    }

    async updateList(input: { id: string; name: string; status: ShoppingListStatusType }): Promise<ShoppingList> {
        const list = await $fetch<ApiShoppingList>(`/api/shopping-lists/${input.id}`, {
            method: "PUT",
            body: {
                name: input.name,
                status: input.status,
            },
        });

        return toDomainList(list);
    }

    async duplicateList(id: string, name?: string): Promise<ShoppingList> {
        const list = await $fetch<ApiShoppingList>(`/api/shopping-lists/${id}/duplicate`, {
            method: "POST",
            body: name ? { name } : {},
        });

        return toDomainList(list);
    }

    async deleteList(id: string): Promise<void> {
        await $fetch(`/api/shopping-lists/${id}`, {
            method: "DELETE",
        });
    }

    async addItem(item: ShoppingListItem): Promise<ShoppingListItem> {
        const result = await $fetch<ApiShoppingListItem>(`/api/shopping-lists/item/${item.getListId()}`, {
            method: "POST",
            body: {
                name: item.getName(),
                notes: item.getNotes(),
                boughtQuantity: item.getBoughtQuantity(),
                unitPrice: item.getUnitPrice(),
            },
        });

        return toDomainItem(result);
    }

    async updateItem(item: ShoppingListItem): Promise<ShoppingListItem> {
        const result = await $fetch<ApiShoppingListItem>(`/api/shopping-lists/item/${item.getId()}`, {
            method: "PUT",
            body: {
                name: item.getName(),
                notes: item.getNotes(),
                boughtQuantity: item.getBoughtQuantity(),
                unitPrice: item.getUnitPrice(),
            },
        });

        return toDomainItem(result);
    }

    async removeItem(itemId: string): Promise<void> {
        await $fetch(`/api/shopping-lists/item/${itemId}`, {
            method: "DELETE",
        });
    }
}
