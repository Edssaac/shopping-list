import { createSQLiteDependencies } from "./createSQLiteDependencies";

let dependencies: ReturnType<typeof createSQLiteDependencies> | null = null;

export function getSQLiteDependencies() {
    if (!dependencies) {
        dependencies = createSQLiteDependencies();
    }

    return dependencies;
}
