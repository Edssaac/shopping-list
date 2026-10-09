import { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import { type ShoppingListStatusType } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";
import { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";

import { createShoppingListDataSource } from "~~/core/infrastructure/data-sources/shopping-list/CreateShoppingListDataSource";

export function emptyItem(listId: string): ShoppingListItem {
    return new ShoppingListItem({
        id: crypto.randomUUID(),
        listId,
        name: "",
        notes: "",
        boughtQuantity: 0,
        unitPrice: 0,
    });
}

export function useShoppingLists() {
    const dataSource = createShoppingListDataSource();

    const lists = useState<ShoppingList[]>("shopping-lists", () => []);

    const loading = useState("shopping-lists-loading", () => true);

    const initialized = useState("shopping-lists-initialized", () => false);

    const error = useState<string | null>("shopping-lists-error", () => null);

    async function initialize(): Promise<void> {
        if (initialized.value) {
            return;
        }

        loading.value = true;
        error.value = null;

        try {
            await dataSource.initialize();

            initialized.value = true;

            await loadLists();
        } catch (err) {
            error.value = err instanceof Error ? err.message : "Não foi possível inicializar os dados.";

            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function loadLists(): Promise<ShoppingList[]> {
        loading.value = true;
        error.value = null;

        try {
            const result = await dataSource.loadLists();

            lists.value = result;

            return result;
        } catch (err) {
            error.value = err instanceof Error ? err.message : "Não foi possível carregar as listas.";

            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function getList(id: string): Promise<ShoppingList | null> {
        try {
            return await dataSource.getList(id);
        } catch (err) {
            error.value = err instanceof Error ? err.message : "Não foi possível carregar a lista.";

            return null;
        }
    }

    async function createList(name = "Nova Lista"): Promise<ShoppingList> {
        error.value = null;

        try {
            const list = await dataSource.createList(name);

            lists.value = [list, ...lists.value];

            return list;
        } catch (err) {
            error.value = err instanceof Error ? err.message : "Não foi possível criar a lista.";

            throw err;
        }
    }

    async function updateList(input: {
        id: string;
        name: string;
        status: ShoppingListStatusType;
    }): Promise<ShoppingList> {
        error.value = null;

        try {
            const updated = await dataSource.updateList(input);

            lists.value = lists.value.map((list) => {
                if (list.getId() === updated.getId()) {
                    updated.setItems(list.getItems());

                    return updated;
                }

                return list;
            });

            return updated;
        } catch (err) {
            error.value = err instanceof Error ? err.message : "Não foi possível atualizar a lista.";

            throw err;
        }
    }

    async function duplicateList(id: string, name?: string): Promise<ShoppingList> {
        error.value = null;

        try {
            const list = await dataSource.duplicateList(id, name);

            const originalIndex = lists.value.findIndex((item) => item.getId() === id);

            if (originalIndex === -1) {
                lists.value = [list, ...lists.value];
            } else {
                lists.value.splice(originalIndex + 1, 0, list);
            }

            return list;
        } catch (err) {
            error.value = err instanceof Error ? err.message : "Não foi possível duplicar a lista.";

            throw err;
        }
    }

    async function deleteList(id: string): Promise<void> {
        error.value = null;

        try {
            await dataSource.deleteList(id);

            lists.value = lists.value.filter((list) => list.getId() !== id);
        } catch (err) {
            error.value = err instanceof Error ? err.message : "Não foi possível excluir a lista.";

            throw err;
        }
    }

    async function addItem(item: ShoppingListItem): Promise<ShoppingListItem> {
        error.value = null;

        try {
            const created = await dataSource.addItem(item);

            const list = lists.value.find((list) => list.getId() === item.getListId());

            if (list) {
                list.addItem(created);
            }

            return created;
        } catch (err) {
            error.value = err instanceof Error ? err.message : "Não foi possível adicionar o item.";

            throw err;
        }
    }

    async function updateItem(item: ShoppingListItem): Promise<ShoppingListItem> {
        error.value = null;

        try {
            const updated = await dataSource.updateItem(item);

            const list = lists.value.find((list) => list.getId() === updated.getListId());

            if (list) {
                list.updateItem(updated);
            }

            return updated;
        } catch (err) {
            error.value = err instanceof Error ? err.message : "Não foi possível atualizar o item.";

            throw err;
        }
    }

    async function removeItem(itemId: string): Promise<void> {
        error.value = null;

        try {
            await dataSource.removeItem(itemId);

            for (const list of lists.value) {
                if (list.hasItem(itemId)) {
                    list.removeItem(itemId);
                    break;
                }
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : "Não foi possível excluir o item.";

            throw err;
        }
    }

    return {
        lists: computed(() => lists.value),
        loading: computed(() => loading.value),
        initialized: computed(() => initialized.value),
        error: computed(() => error.value),

        initialize,
        loadLists,

        getList,

        createList,
        updateList,
        duplicateList,
        deleteList,

        addItem,
        updateItem,
        removeItem,
    };
}
