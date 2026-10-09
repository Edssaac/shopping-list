import { createDrizzleDependencies } from "~~/core/infrastructure/dependencies/createDrizzleDependencies";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
        throw createError({
            statusCode: 400,
            message: "O ID da lista é obrigatório.",
        });
    }

    const dependencies = createDrizzleDependencies();

    try {
        return await dependencies.getShoppingList.execute(id);
    } catch (error) {
        throw createError({
            statusCode: 404,
            message: error instanceof Error ? error.message : "Lista não encontrada.",
        });
    }
});
