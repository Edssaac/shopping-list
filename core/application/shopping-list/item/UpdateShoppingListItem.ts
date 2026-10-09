import type { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";
import type { IShoppingListItemRepository } from "~~/core/domain/shopping-list/repositories/IShoppingListItemRepository";

export interface UpdateShoppingListItemInput {
    id: string;
    name: string;
    notes: string;
    boughtQuantity: number;
    unitPrice: number;
}

export class UpdateShoppingListItem {
    constructor(private readonly shoppingListItemRepository: IShoppingListItemRepository) {}

    async execute(input: UpdateShoppingListItemInput): Promise<ShoppingListItem> {
        const item = await this.shoppingListItemRepository.findById(input.id);

        if (!item) {
            throw new Error("Produto não encontrado.");
        }

        item.rename(input.name);
        item.changeNotes(input.notes);
        item.registerPurchase(input.boughtQuantity, input.unitPrice);

        await this.shoppingListItemRepository.save(item);

        return item;
    }
}
