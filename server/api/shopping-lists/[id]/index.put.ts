import { createDrizzleDependencies } from "~~/core/infrastructure/dependencies/createDrizzleDependencies";

import { type ShoppingListStatusType } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";

interface UpdateShoppingListBody {
    name: string;
    status: ShoppingListStatusType;
}

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
        throw createError({
            statusCode: 400,
            message: "O ID da lista é obrigatório.",
        });
    }

    const body = await readBody<UpdateShoppingListBody>(event);

    if (!body.name.trim()) {
        throw createError({
            statusCode: 400,
            message: "O nome da lista é obrigatório.",
        });
    }

    if (!body.status) {
        throw createError({
            statusCode: 400,
            message: "O status da lista é obrigatório.",
        });
    }

    const dependencies = createDrizzleDependencies();

    try {
        return await dependencies.updateShoppingList.execute({
            id,
            name: body.name.trim(),
            status: body.status,
        });
    } catch (error) {
        throw createError({
            statusCode: 404,
            message: error instanceof Error ? error.message : "Lista não encontrada.",
        });
    }
});
