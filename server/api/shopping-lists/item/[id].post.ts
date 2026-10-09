import { createDrizzleDependencies } from "~~/core/infrastructure/dependencies/createDrizzleDependencies";

interface AddShoppingListItemBody {
    name: string;
    notes?: string;
    boughtQuantity?: number;
    unitPrice?: number;
}

export default defineEventHandler(async (event) => {
    const listId = getRouterParam(event, "id");

    if (!listId) {
        throw createError({
            statusCode: 400,
            statusMessage: "O ID da lista é obrigatório.",
        });
    }

    const body = await readBody<AddShoppingListItemBody>(event);

    if (!body.name.trim()) {
        throw createError({
            statusCode: 400,
            statusMessage: "O nome do item é obrigatório.",
        });
    }

    const dependencies = createDrizzleDependencies();

    try {
        return await dependencies.addShoppingListItem.execute({
            listId,
            name: body.name.trim(),
            notes: body.notes ?? "",
            boughtQuantity: body.boughtQuantity ?? 0,
            unitPrice: body.unitPrice ?? 0,
        });
    } catch (error) {
        throw createError({
            statusCode: 404,
            statusMessage: error instanceof Error ? error.message : "Não foi possível adicionar o item.",
        });
    }
});
