import { createDrizzleDependencies } from "~~/core/infrastructure/dependencies/createDrizzleDependencies";

interface CreateShoppingListBody {
    name: string;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<CreateShoppingListBody>(event);

    if (!body.name.trim()) {
        throw createError({
            statusCode: 400,
            message: "O nome da lista é obrigatório.",
        });
    }

    const dependencies = createDrizzleDependencies();

    return await dependencies.createShoppingList.execute({
        name: body.name.trim(),
    });
});
