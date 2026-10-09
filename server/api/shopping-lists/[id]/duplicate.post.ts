import { createDrizzleDependencies } from "~~/core/infrastructure/dependencies/createDrizzleDependencies";

interface DuplicateShoppingListBody {
    name?: string;
}

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
        throw createError({
            statusCode: 400,
            message: "O ID da lista é obrigatório.",
        });
    }

    const body = await readBody<DuplicateShoppingListBody>(event);

    const dependencies = createDrizzleDependencies();

    try {
        return await dependencies.duplicateShoppingList.execute({
            id,
            name: body?.name?.trim() || undefined,
        });
    } catch (error) {
        throw createError({
            statusCode: 404,
            message: error instanceof Error ? error.message : "Lista não encontrada.",
        });
    }
});
