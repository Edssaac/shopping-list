import type { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import type { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";
import type { ShoppingListStatusType } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";

export interface ShoppingListDataSource {
    initialize(): Promise<void>;

    loadLists(): Promise<ShoppingList[]>;

    getList(id: string): Promise<ShoppingList | null>;

    createList(name?: string): Promise<ShoppingList>;

    updateList(input: { id: string; name: string; status: ShoppingListStatusType }): Promise<ShoppingList>;

    duplicateList(id: string, name?: string): Promise<ShoppingList>;

    deleteList(id: string): Promise<void>;

    addItem(item: ShoppingListItem): Promise<ShoppingListItem>;

    updateItem(item: ShoppingListItem): Promise<ShoppingListItem>;

    removeItem(itemId: string): Promise<void>;
}
