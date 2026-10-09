import { ShoppingListRepository } from "~~/core/infrastructure/repositories/drizzle/ShoppingListRepository";
import { ShoppingListItemRepository } from "~~/core/infrastructure/repositories/drizzle/ShoppingListItemRepository";

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

export function createDrizzleDependencies() {
    const shoppingListRepository = new ShoppingListRepository();

    const shoppingListItemRepository = new ShoppingListItemRepository();

    const findShoppingList = new FindShoppingList(shoppingListRepository);

    return {
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
