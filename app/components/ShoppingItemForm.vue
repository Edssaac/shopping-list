<script setup lang="ts">
import Dialog from "~/components/ui/Dialog.vue";
import Button from "~/components/ui/Button.vue";
import Textarea from "~/components/ui/Textarea.vue";
import Input from "~/components/ui/Input.vue";
import Label from "~/components/ui/Label.vue";
import { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";
import { emptyItem } from "~/composables/useShoppingLists";

const props = defineProps<{
    open: boolean;
    listId: string;
    item: ShoppingListItem | null;
}>();

const emit = defineEmits<{
    "update:open": [value: boolean];
    save: [item: ShoppingListItem];
}>();

const baseItem = emptyItem(props.listId);

const form = reactive({
    id: baseItem.getId(),
    listId: baseItem.getListId(),
    name: baseItem.getName(),
    notes: baseItem.getNotes(),
    boughtQuantity: baseItem.getBoughtQuantity(),
    unitPrice: Number(baseItem.getUnitPrice()),
});

watch(
    () => props.item,
    (item) => {
        if (!item) {
            return;
        }

        Object.assign(form, {
            id: item.getId(),
            listId: item.getListId(),
            name: item.getName(),
            notes: item.getNotes(),
            boughtQuantity: item.getBoughtQuantity(),
            unitPrice: Number(item.getUnitPrice()),
        });
    },
    { immediate: true },
);

const isEditing = computed(() => Boolean(props.item));

function submit() {
    const name = form.name.trim();

    if (!name) {
        return;
    }

    const item = new ShoppingListItem(form);

    emit("save", item);
    emit("update:open", false);
}
</script>

<template>
    <Dialog
        :open="open"
        :title="isEditing ? 'Editar item' : 'Adicionar item'"
        description="Informações do produto."
        @update:open="emit('update:open', $event)"
    >
        <form v-if="form" class="space-y-4 mt-8" @submit.prevent="submit">
            <div class="flex flex-col gap-2">
                <Label for="item-name">Nome do produto</Label>

                <Input id="item-name" v-model="form.name" placeholder="Ex: Arroz integral 5kg" />
            </div>

            <div class="flex flex-col gap-2">
                <Label for="item-bought-quantity">Quantidade comprada</Label>

                <Input id="item-bought-quantity" v-model.number="form.boughtQuantity" type="number" min="0" />
            </div>

            <div class="flex flex-col gap-2">
                <Label for="item-unit-price">Valor unitário</Label>

                <Input id="item-unit-price" v-model.number="form.unitPrice" type="number" min="0" step="0.01" />
            </div>

            <div class="flex flex-col gap-2">
                <Label for="item-notes">Observações</Label>

                <Textarea id="item-notes" v-model="form.notes" placeholder="Opcional" />
            </div>

            <div class="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button" @click="emit('update:open', false)"> Cancelar </Button>

                <Button type="submit" :disabled="!form.name.trim()">
                    {{ isEditing ? "Salvar item" : "Adicionar" }}
                </Button>
            </div>
        </form>
    </Dialog>
</template>
