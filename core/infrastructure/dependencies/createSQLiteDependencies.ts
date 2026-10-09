import { SQLiteDatabase } from "~~/core/infrastructure/database/SQLiteDatabase";
import { DatabaseInitializer } from "~~/core/infrastructure/database/DatabaseInitializer";

import { ShoppingListRepository } from "~~/core/infrastructure/repositories/sqlite/ShoppingListRepository";
import { ShoppingListItemRepository } from "~~/core/infrastructure/repositories/sqlite/ShoppingListItemRepository";

import { CreateShoppingList } from "~~/core/application/shopping-list/CreateShoppingList";
import { DeleteShoppingList } from "~~/core/application/shopping-list/DeleteShoppingList";
import { DuplicateShoppingList } from "~~/core/application/shopping-list/DuplicateShoppingList";
import { FindShoppingList } from "~~/core/application/shopping-list/FindShoppingList";
import { GetShoppingList } from "~~/core/application/shopping-list/GetShoppingList";
import { ListShoppingLists } from "~~/core/application/shopping-list/ListShoppingLists";
import { UpdateShoppingList } from "~~/core/application/shopping-list/UpdateShoppingList";

import { AddShoppingListItem } from "~~/core/application/shopping-list/item/AddShoppingListItem";
import { RemoveShoppingListItem } from "~~/core/application/shopping-list/item/RemoveShoppingListItem";
import { UpdateShoppingListItem } from "~~/core/application/shopping-list/item/UpdateShoppingListItem";

export function createSQLiteDependencies() {
    const database = new SQLiteDatabase("shopping-list");

    const initializer = new DatabaseInitializer(database);

    const shoppingListRepository = new ShoppingListRepository(database);

    const shoppingListItemRepository = new ShoppingListItemRepository(database);

    const findShoppingList = new FindShoppingList(shoppingListRepository);

    return {
        database,
        initializer,

        createShoppingList: new CreateShoppingList(shoppingListRepository),

        deleteShoppingList: new DeleteShoppingList(findShoppingList, shoppingListRepository),

        duplicateShoppingList: new DuplicateShoppingList(
            findShoppingList,
            shoppingListRepository,
            shoppingListItemRepository,
        ),

        findShoppingList,

        getShoppingList: new GetShoppingList(findShoppingList, shoppingListItemRepository),

        listShoppingLists: new ListShoppingLists(shoppingListRepository, shoppingListItemRepository),

        updateShoppingList: new UpdateShoppingList(findShoppingList, shoppingListRepository),

        addShoppingListItem: new AddShoppingListItem(findShoppingList, shoppingListItemRepository),

        removeShoppingListItem: new RemoveShoppingListItem(shoppingListItemRepository),

        updateShoppingListItem: new UpdateShoppingListItem(shoppingListItemRepository),
    };
}
