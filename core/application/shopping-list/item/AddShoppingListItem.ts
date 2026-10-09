import { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";
import type { IShoppingListItemRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListItemRepository";
import { FindShoppingList } from "~~/core/application/shopping-list/FindShoppingList";

export interface AddShoppingListItemInput {
    listId: string;
    name: string;
    boughtQuantity: number;
    unitPrice: number;
    notes: string;
}

export class AddShoppingListItem {
    constructor(
        private readonly findShoppingList: FindShoppingList,
        private readonly shoppingListItemRepository: IShoppingListItemRepository,
    ) {}

    async execute(input: AddShoppingListItemInput): Promise<ShoppingListItem> {
        const shoppingList = await this.findShoppingList.execute(input.listId);

        const item = new ShoppingListItem({
            id: crypto.randomUUID(),
            listId: shoppingList.getId(),
            name: input.name,
            notes: input.notes,
            boughtQuantity: input.boughtQuantity,
            unitPrice: input.unitPrice,
        });

        await this.shoppingListItemRepository.save(item);

        return item;
    }
}
