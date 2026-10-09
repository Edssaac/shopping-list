import type { IShoppingListItemRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListItemRepository";

export class RemoveShoppingListItem {
    constructor(private readonly shoppingListItemRepository: IShoppingListItemRepository) {}

    async execute(id: string): Promise<void> {
        const item = await this.shoppingListItemRepository.findById(id);

        if (!item) {
            throw new Error("Produto não encontrado.");
        }

        await this.shoppingListItemRepository.delete(id);
    }
}
