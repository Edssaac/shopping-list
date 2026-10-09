import { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import type { IShoppingListRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListRepository";
import { FindShoppingList } from "~~/core/application/shopping-list/FindShoppingList";
import { type ShoppingListStatusType } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";

export interface UpdateShoppingListInput {
    id: string;
    name: string;
    status: ShoppingListStatusType;
}

export class UpdateShoppingList {
    constructor(
        private readonly findShoppingList: FindShoppingList,
        private readonly shoppingListRepository: IShoppingListRepository,
    ) {}

    async execute(input: UpdateShoppingListInput): Promise<ShoppingList> {
        const list = await this.findShoppingList.execute(input.id);

        list.rename(input.name);
        list.setStatus(input.status);

        await this.shoppingListRepository.save(list);

        return list;
    }
}
