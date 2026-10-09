import { createDrizzleDependencies } from "~~/core/infrastructure/dependencies/createDrizzleDependencies";

export default defineEventHandler(async () => {
    const dependencies = createDrizzleDependencies();

    return await dependencies.listShoppingLists.execute();
});
