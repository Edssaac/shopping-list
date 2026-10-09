import type { IShoppingListRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListRepository";
import { FindShoppingList } from "~~/core/application/shopping-list/FindShoppingList";

export class DeleteShoppingList {
    constructor(
        private readonly findShoppingList: FindShoppingList,
        private readonly shoppingListRepository: IShoppingListRepository,
    ) {}

    async execute(id: string): Promise<void> {
        await this.findShoppingList.execute(id);

        await this.shoppingListRepository.delete(id);
    }
}
