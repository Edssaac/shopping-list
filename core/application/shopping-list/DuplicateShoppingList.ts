import { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import { SHOPPING_LIST_STATUS } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";
import { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";
import type { IShoppingListRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListRepository";
import type { IShoppingListItemRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListItemRepository";
import { FindShoppingList } from "~~/core/application/shopping-list/FindShoppingList";

export interface DuplicateShoppingListInput {
    id: string;
    name?: string;
}

export class DuplicateShoppingList {
    constructor(
        private readonly findShoppingList: FindShoppingList,
        private readonly shoppingListRepository: IShoppingListRepository,
        private readonly shoppingListItemRepository: IShoppingListItemRepository,
    ) {}

    async execute(input: DuplicateShoppingListInput): Promise<ShoppingList> {
        const original = await this.findShoppingList.execute(input.id);

        const originalItems = await this.shoppingListItemRepository.findByListId(original.getId());

        const duplicatedList = new ShoppingList({
            id: crypto.randomUUID(),
            name: input.name ?? `${original.getName()} - Cópia`,
            createdAt: new Date().toISOString(),
            status: SHOPPING_LIST_STATUS.DRAFT.value,
        });

        await this.shoppingListRepository.save(duplicatedList);

        for (const originalItem of originalItems) {
            const duplicatedItem = new ShoppingListItem({
                id: crypto.randomUUID(),
                listId: duplicatedList.getId(),
                name: originalItem.getName(),
                notes: originalItem.getNotes(),
                boughtQuantity: 0,
                unitPrice: 0,
            });

            await this.shoppingListItemRepository.save(duplicatedItem);

            duplicatedList.addItem(duplicatedItem);
        }

        return duplicatedList;
    }
}
