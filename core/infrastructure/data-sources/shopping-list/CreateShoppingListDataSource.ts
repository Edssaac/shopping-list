import { Capacitor } from "@capacitor/core";

import type { ShoppingListDataSource } from "./ShoppingListDataSource";
import { SQLiteShoppingListDataSource } from "./SQLiteShoppingListDataSource";
import { ApiShoppingListDataSource } from "./ApiShoppingListDataSource";

export function createShoppingListDataSource(): ShoppingListDataSource {
    if (import.meta.client && Capacitor.isNativePlatform()) {
        return new SQLiteShoppingListDataSource();
    }

    return new ApiShoppingListDataSource();
}
