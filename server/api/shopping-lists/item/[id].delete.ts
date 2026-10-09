import { createDrizzleDependencies } from "~~/core/infrastructure/dependencies/createDrizzleDependencies";

export default defineEventHandler(async (event) => {
    const itemId = getRouterParam(event, "id");

    if (!itemId) {
        throw createError({
            statusCode: 400,
            statusMessage: "O ID do item é obrigatório.",
        });
    }

    const dependencies = createDrizzleDependencies();

    try {
        await dependencies.removeShoppingListItem.execute(itemId);

        return {
            success: true,
        };
    } catch (error) {
        throw createError({
            statusCode: 404,
            statusMessage: error instanceof Error ? error.message : "Item não encontrado.",
        });
    }
});
