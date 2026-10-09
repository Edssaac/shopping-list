import type { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";

export interface IShoppingListRepository {
    findAll(): Promise<ShoppingList[]>;

    findById(id: string): Promise<ShoppingList | null>;

    save(shoppingList: ShoppingList): Promise<void>;

    delete(id: string): Promise<void>;
}
