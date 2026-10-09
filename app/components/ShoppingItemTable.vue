<script setup lang="ts">
import { Plus, Pencil, Trash2, ClipboardList } from "lucide-vue-next";
import Button from "~/components/ui/Button.vue";
import AlertDialog from "~/components/ui/AlertDialog.vue";
import PurchaseSummary from "~/components/PurchaseSummary.vue";
import NotesCollapsible from "~/components/NotesCollapsible.vue";
import { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";

const props = defineProps<{
    items: ShoppingListItem[];
    totalValue: string;
}>();

const emit = defineEmits<{
    add: [];
    edit: [id: string];
    remove: [id: string];
}>();
</script>

<template>
    <div class="space-y-4">
        <PurchaseSummary :items="items" :total-value="totalValue" />

        <div class="flex items-center justify-between gap-3 mt-10">
            <h2 class="text-foreground text-sm font-semibold">Itens</h2>

            <Button size="sm" @click="emit('add')">
                <Plus />
                Adicionar Item
            </Button>
        </div>

        <div class="border-border bg-card overflow-x-auto rounded-lg border">
            <table class="w-full text-sm">
                <thead>
                    <tr
                        class="border-border bg-muted/50 text-muted-foreground border-b text-left text-xs tracking-wide uppercase"
                    >
                        <th class="px-4 py-3 font-medium">Produto</th>
                        <th class="px-4 py-3 text-right font-medium">Quantidade comprada</th>
                        <th class="px-4 py-3 text-right font-medium">Valor unitário</th>
                        <th class="px-4 py-3 text-right font-medium">Subtotal</th>
                        <th class="px-4 py-3 text-right font-medium">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-if="items.length === 0">
                        <td colspan="5" class="px-4 py-14">
                            <div class="text-muted-foreground flex flex-col items-center gap-3 text-center">
                                <ClipboardList class="size-8" />
                                <p class="text-sm">Nenhum item adicionado. Comece adicionando produtos à lista.</p>
                            </div>
                        </td>
                    </tr>

                    <template v-for="item in items" :key="item.getId()">
                        <tr
                            class="border-border hover:bg-muted/40 transition-colors last:border-0"
                            :class="[item.getNotes().length === 0 && 'border-b']"
                        >
                            <td class="text-foreground px-4 py-3 font-medium">
                                {{ item.getName() }}
                            </td>

                            <td class="text-muted-foreground px-4 py-3 text-right tabular-nums">
                                {{ item.getBoughtQuantity() }}
                            </td>

                            <td class="text-muted-foreground px-4 py-3 text-right tabular-nums">
                                {{ item.getUnitPrice(true) }}
                            </td>

                            <td class="text-foreground px-4 py-3 text-right tabular-nums">
                                {{ item.getSubtotal(true) }}
                            </td>

                            <td class="px-4 py-3">
                                <div class="flex justify-end gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Editar item"
                                        @click="emit('edit', item.getId())"
                                    >
                                        <Pencil />
                                    </Button>

                                    <AlertDialog
                                        title="Remover item?"
                                        :description="`“${item.getName()}” será removido desta lista.`"
                                        confirm-label="Remover"
                                        @confirm="emit('remove', item.getId())"
                                    >
                                        <template #trigger>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Remover item"
                                                class="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                            >
                                                <Trash2 />
                                            </Button>
                                        </template>
                                    </AlertDialog>
                                </div>
                            </td>
                        </tr>

                        <tr v-if="item.getNotes()" class="border-border hover:bg-muted/40 border-b transition-colors">
                            <td colspan="5" class="px-4 pb-2">
                                <NotesCollapsible :notes="item.getNotes()" />
                            </td>
                        </tr>
                    </template>
                </tbody>

                <tfoot v-if="items.length > 0">
                    <tr class="border-border bg-muted/40 border-t">
                        <td colspan="3" class="text-muted-foreground px-4 py-3 text-right text-sm font-medium">
                            Valor total da compra:
                        </td>

                        <td class="text-foreground px-4 py-3 text-right text-base font-semibold tabular-nums">
                            {{ totalValue }}
                        </td>

                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>
