<script setup lang="ts">
import { ArrowLeft, Save } from "lucide-vue-next";

import AppShell from "~/components/AppShell.vue";
import Button from "~/components/ui/Button.vue";
import Input from "~/components/ui/Input.vue";
import Label from "~/components/ui/Label.vue";
import Select from "~/components/ui/Select.vue";
import ShoppingItemTable from "~/components/ShoppingItemTable.vue";
import ShoppingItemForm from "~/components/ShoppingItemForm.vue";
import ShoppingListEditSkeleton from "~/components/ShoppingListEditSkeleton.vue";

import { useShoppingLists } from "~/composables/useShoppingLists";

import { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";
import { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";

import { SHOPPING_LIST_STATUS } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";
import type { ShoppingListStatusType } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";

useHead({
    title: "Lista de Compras",
});

const route = useRoute();
const router = useRouter();

const { initialize, getList, updateList, addItem, updateItem, removeItem } = useShoppingLists();

const id = route.params.id as string;

const draft = shallowRef<ShoppingList | null>(null);

const loading = ref(true);
const saving = ref(false);
const savedFlash = ref(false);

const formOpen = ref(false);
const editingItem = shallowRef<ShoppingListItem | null>(null);

const listName = computed({
    get: () => draft.value?.getName() ?? "",
    set: (name: string) => {
        draft.value?.rename(name);
    },
});

const listStatus = computed<ShoppingListStatusType>({
    get: () => draft.value?.getStatus() ?? SHOPPING_LIST_STATUS.DRAFT.value,

    set: (status) => {
        if (!draft.value) {
            return;
        }

        draft.value.setStatus(status);
        draft.value = cloneList(draft.value);
    },
});

const listStatusOptions = Object.values(SHOPPING_LIST_STATUS).map(({ title, value }) => ({
    label: title,
    value,
}));

function showSavedFlash(): void {
    savedFlash.value = true;

    setTimeout(() => {
        savedFlash.value = false;
    }, 2000);
}

function cloneItem(item: ShoppingListItem): ShoppingListItem {
    return new ShoppingListItem({
        id: item.getId(),
        listId: item.getListId(),
        name: item.getName(),
        notes: item.getNotes(),
        boughtQuantity: item.getBoughtQuantity(),
        unitPrice: Number(item.getUnitPrice()),
    });
}

function cloneList(list: ShoppingList): ShoppingList {
    return new ShoppingList({
        id: list.getId(),
        name: list.getName(),
        createdAt: list.getCreatedAt(),
        status: list.getStatus(),
        items: list.getItems().map(cloneItem),
    });
}

function openAddItem() {
    editingItem.value = null;

    formOpen.value = true;
}

function openEditItem(itemId: string) {
    if (!draft.value) {
        return;
    }

    const item = draft.value.getItems().find((item) => item.getId() === itemId);

    if (!item) {
        return;
    }

    editingItem.value = cloneItem(item);

    formOpen.value = true;
}

async function saveItem(item: ShoppingListItem) {
    if (!draft.value) {
        return;
    }

    const existingItem = draft.value.getItems().find((currentItem) => currentItem.getId() === item.getId());

    if (existingItem) {
        const updatedItem = await updateItem(item);

        draft.value.updateItem(updatedItem);
    } else {
        const createdItem = await addItem(item);

        draft.value.addItem(createdItem);
    }

    draft.value = cloneList(draft.value);

    showSavedFlash();
}

async function removeItemFromDraft(itemId: string) {
    if (!draft.value) {
        return;
    }

    await removeItem(itemId);

    draft.value.removeItem(itemId);

    draft.value = cloneList(draft.value);

    showSavedFlash();
}

async function save() {
    if (!draft.value || saving.value) {
        return;
    }

    saving.value = true;

    try {
        const savedList = await updateList({
            id: draft.value.getId(),
            name: draft.value.getName(),
            status: draft.value.getStatus(),
        });

        draft.value = cloneList(savedList);

        showSavedFlash();
    } finally {
        saving.value = false;
    }
}

function goBack() {
    router.push("/");
}

onMounted(async () => {
    try {
        await initialize();

        const list = await withMinimumDelay(getList(id), 500);

        if (!list) {
            goBack();

            return;
        }

        draft.value = cloneList(list);
    } catch {
        goBack();
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <AppShell>
        <ShoppingListEditSkeleton v-if="loading" />

        <template v-else-if="draft">
            <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between gap-3">
                    <Button variant="ghost" size="sm" class="text-muted-foreground -ml-2" @click="goBack">
                        <ArrowLeft />
                        Voltar
                    </Button>

                    <div class="flex items-center gap-2">
                        <span v-if="savedFlash" class="flex gap-2 text-primary text-xs font-medium" role="status">
                            <Save class="size-4" />
                            Alterações salvas
                        </span>
                    </div>
                </div>

                <div
                    class="border-border bg-card grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-[1fr_auto] sm:items-end"
                >
                    <div class="space-y-2">
                        <Label for="list-name"> Nome da lista </Label>

                        <Input
                            id="list-name"
                            v-model="listName"
                            placeholder="Ex: Compras da semana"
                            class="sm:max-w-md"
                            @change="save"
                        />
                    </div>

                    <div class="space-y-2">
                        <Label for="list-status"> Status </Label>

                        <Select
                            id="list-status"
                            v-model="listStatus"
                            :options="listStatusOptions"
                            class="w-full sm:w-48"
                            @change="save"
                        />
                    </div>
                </div>
            </div>

            <ShoppingItemTable
                class="mt-10"
                :items="draft.getItems()"
                :total-value="String(draft.getTotalValue(true))"
                @add="openAddItem"
                @edit="openEditItem"
                @remove="removeItemFromDraft"
            />

            <ShoppingItemForm
                v-if="formOpen"
                v-model:open="formOpen"
                :list-id="draft.getId()"
                :item="editingItem"
                @save="saveItem"
            />
        </template>
    </AppShell>
</template>
