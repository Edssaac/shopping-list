import { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import type { IShoppingListItemRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListItemRepository";
import { FindShoppingList } from "~~/core/application/shopping-list/FindShoppingList";

export class GetShoppingList {
    constructor(
        private readonly findShoppingList: FindShoppingList,
        private readonly shoppingListItemRepository: IShoppingListItemRepository,
    ) {}

    async execute(id: string): Promise<ShoppingList> {
        const list = await this.findShoppingList.execute(id);
        const items = await this.shoppingListItemRepository.findByListId(list.getId());

        list.setItems(items);

        return list;
    }
}
