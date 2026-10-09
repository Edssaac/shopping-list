import type { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import type { IShoppingListRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListRepository";

export class FindShoppingList {
    constructor(private readonly shoppingListRepository: IShoppingListRepository) {}

    async execute(id: string): Promise<ShoppingList> {
        const shoppingList = await this.shoppingListRepository.findById(id);

        if (!shoppingList) {
            throw new Error("Lista não encontrada");
        }

        return shoppingList;
    }
}
