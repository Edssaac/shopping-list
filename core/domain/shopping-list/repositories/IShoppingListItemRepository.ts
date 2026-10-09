import type { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";

export interface IShoppingListItemRepository {
    findById(id: string): Promise<ShoppingListItem | null>;

    findByListId(listId: string): Promise<ShoppingListItem[]>;

    save(item: ShoppingListItem): Promise<void>;

    delete(id: string): Promise<void>;

    deleteByListId(listId: string): Promise<void>;
}
