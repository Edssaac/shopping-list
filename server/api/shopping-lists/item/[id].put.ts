import { createDrizzleDependencies } from "~~/core/infrastructure/dependencies/createDrizzleDependencies";

interface UpdateShoppingListItemBody {
    name: string;
    notes?: string;
    boughtQuantity: number;
    unitPrice: number;
}

export default defineEventHandler(async (event) => {
    const itemId = getRouterParam(event, "id");

    if (!itemId) {
        throw createError({
            statusCode: 400,
            statusMessage: "O ID do item é obrigatório.",
        });
    }

    const body = await readBody<UpdateShoppingListItemBody>(event);

    if (!body.name.trim()) {
        throw createError({
            statusCode: 400,
            statusMessage: "O nome do item é obrigatório.",
        });
    }

    if (body.boughtQuantity < 0) {
        throw createError({
            statusCode: 400,
            statusMessage: "A quantidade comprada não pode ser negativa.",
        });
    }

    if (body.unitPrice < 0) {
        throw createError({
            statusCode: 400,
            statusMessage: "O preço unitário não pode ser negativo.",
        });
    }

    const dependencies = createDrizzleDependencies();

    try {
        return await dependencies.updateShoppingListItem.execute({
            id: itemId,
            name: body.name.trim(),
            notes: body.notes ?? "",
            boughtQuantity: body.boughtQuantity,
            unitPrice: body.unitPrice,
        });
    } catch (error) {
        throw createError({
            statusCode: 404,
            statusMessage: error instanceof Error ? error.message : "Item não encontrado.",
        });
    }
});
