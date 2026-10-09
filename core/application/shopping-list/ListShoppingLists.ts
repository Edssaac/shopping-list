import type { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import type { IShoppingListRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListRepository";
import type { IShoppingListItemRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListItemRepository";

export class ListShoppingLists {
    constructor(
        private readonly shoppingListRepository: IShoppingListRepository,
        private readonly shoppingListItemRepository: IShoppingListItemRepository,
    ) {}

    async execute(): Promise<ShoppingList[]> {
        const lists = await this.shoppingListRepository.findAll();

        await Promise.all(
            lists.map(async (list) => {
                const items = await this.shoppingListItemRepository.findByListId(list.getId());

                list.setItems(items);
            }),
        );

        return lists;
    }
}
