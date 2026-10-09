import { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import { SHOPPING_LIST_STATUS } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";
import type { IShoppingListRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListRepository";

export interface CreateShoppingListInput {
    name: string;
}

export class CreateShoppingList {
    constructor(private readonly shoppingListRepository: IShoppingListRepository) {}

    async execute(input: CreateShoppingListInput): Promise<ShoppingList> {
        const shoppingList = new ShoppingList({
            id: crypto.randomUUID(),
            name: input.name,
            createdAt: new Date().toISOString(),
            status: SHOPPING_LIST_STATUS.DRAFT.value,
        });

        await this.shoppingListRepository.save(shoppingList);

        return shoppingList;
    }
}
