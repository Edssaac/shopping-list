<script setup lang="ts">
import { MoreHorizontal, Pencil, Copy, Trash2, PackageOpen, ChevronLeft, ChevronRight } from "lucide-vue-next";
import Button from "~/components/ui/Button.vue";
import DropdownMenu from "~/components/ui/DropdownMenu.vue";
import DropdownMenuItem from "~/components/ui/DropdownMenuItem.vue";
import AlertDialog from "~/components/ui/AlertDialog.vue";
import StatusBadge from "~/components/StatusBadge.vue";
import { ShoppingList } from "~~/core/domain/shopping-list/entities/ShoppingList";

const props = defineProps<{ lists: ShoppingList[]; pageSize?: number }>();

const emit = defineEmits<{
    open: [id: string];
    duplicate: [id: string];
    delete: [id: string];
}>();

const perPage = computed(() => props.pageSize ?? 8);
const page = ref(1);

const totalPages = computed(() => Math.max(1, Math.ceil(props.lists.length / perPage.value)));

const paginatedLists = computed(() => {
    const start = (page.value - 1) * perPage.value;

    return props.lists.slice(start, start + perPage.value);
});

const rangeStart = computed(() => (props.lists.length === 0 ? 0 : (page.value - 1) * perPage.value + 1));

const rangeEnd = computed(() => Math.min(page.value * perPage.value, props.lists.length));

const deleteDialog = reactive({
    isOpen: false,
    list: null as ShoppingList | null,
});

function askDelete(list: ShoppingList) {
    deleteDialog.list = list;

    deleteDialog.isOpen = true;
}

function confirmDelete() {
    if (!deleteDialog.list) {
        return;
    }

    emit("delete", deleteDialog.list.getId());

    deleteDialog.isOpen = false;

    deleteDialog.list = null;
}

watch([() => props.lists.length, totalPages], () => {
    if (page.value > totalPages.value) {
        page.value = totalPages.value;
    }
});

function prevPage() {
    if (page.value > 1) {
        page.value -= 1;
    }
}

function nextPage() {
    if (page.value < totalPages.value) {
        page.value += 1;
    }
}
</script>

<template>
    <div class="border-border bg-card overflow-hidden rounded-lg border">
        <table class="w-full text-sm">
            <thead>
                <tr
                    class="border-border bg-muted/50 text-muted-foreground border-b text-left text-xs tracking-wide uppercase"
                >
                    <th class="px-4 py-3 font-medium">Nome da lista</th>
                    <th class="hidden px-4 py-3 font-medium sm:table-cell">Criada em</th>
                    <th class="px-4 py-3 font-medium">Status</th>
                    <th class="hidden px-4 py-3 text-right font-medium md:table-cell">Itens</th>
                    <th class="px-4 py-3 text-right font-medium">Ações</th>
                </tr>
            </thead>

            <tbody>
                <tr v-if="lists.length === 0">
                    <td colspan="5" class="px-4 py-16">
                        <div class="text-muted-foreground flex flex-col items-center gap-3 text-center">
                            <PackageOpen class="size-8" />
                            <p class="text-sm">Nenhuma lista criada ainda. Clique em “Nova Lista” para começar.</p>
                        </div>
                    </td>
                </tr>

                <tr
                    v-for="list in paginatedLists"
                    :key="list.getId()"
                    class="border-border hover:bg-muted/40 border-b transition-colors last:border-0"
                >
                    <td class="px-4 py-3">
                        <button
                            class="text-foreground hover:text-primary text-left font-medium"
                            @click="emit('open', list.getId())"
                        >
                            {{ list.getName() }}
                        </button>

                        <p class="text-muted-foreground mt-0.5 text-xs sm:hidden">
                            Itens: {{ list.getItems().length }}
                        </p>

                        <p class="text-muted-foreground mt-0.5 text-xs sm:hidden">
                            {{ list.getCreatedAt(true) }}
                        </p>
                    </td>

                    <td class="text-muted-foreground hidden px-4 py-3 sm:table-cell">
                        {{ list.getCreatedAt(true) }}
                    </td>

                    <td class="px-4 py-3">
                        <StatusBadge kind="list" :status="list.getStatusInfo()" />
                    </td>

                    <td class="text-muted-foreground hidden px-4 py-3 text-right tabular-nums md:table-cell">
                        {{ list.getItems().length }}
                    </td>

                    <td class="px-4 py-3">
                        <div class="flex justify-end">
                            <DropdownMenu>
                                <template #trigger>
                                    <Button variant="ghost" size="icon" aria-label="Ações da lista">
                                        <MoreHorizontal />
                                    </Button>
                                </template>

                                <DropdownMenuItem @select="emit('open', list.getId())">
                                    <Pencil />
                                    Abrir/Editar
                                </DropdownMenuItem>

                                <DropdownMenuItem @select="emit('duplicate', list.getId())">
                                    <Copy />
                                    Duplicar
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    class="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                    @select="askDelete(list)"
                                >
                                    <Trash2 />
                                    Excluir
                                </DropdownMenuItem>
                            </DropdownMenu>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div
            v-if="lists.length > 0"
            class="border-border flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
            <p class="text-muted-foreground text-xs">
                Mostrando
                <span class="text-foreground font-medium">{{ rangeStart }}</span>
                -
                <span class="text-foreground font-medium">{{ rangeEnd }}</span>
                de
                <span class="text-foreground font-medium">{{ lists.length }}</span>
                listas
            </p>

            <div class="flex items-center justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    :disabled="page === 1"
                    aria-label="Página anterior"
                    @click="prevPage"
                >
                    <ChevronLeft />
                    Anterior
                </Button>

                <span class="text-muted-foreground text-xs tabular-nums"> {{ page }} / {{ totalPages }} </span>

                <Button
                    variant="outline"
                    size="sm"
                    :disabled="page === totalPages"
                    aria-label="Próxima página"
                    @click="nextPage"
                >
                    Próxima
                    <ChevronRight />
                </Button>
            </div>
        </div>

        <AlertDialog
            v-model:open="deleteDialog.isOpen"
            title="Excluir lista?"
            :description="
                deleteDialog.list ? `A lista “${deleteDialog.list.getName()}” será removida permanentemente.` : ''
            "
            confirm-label="Excluir"
            @confirm="confirmDelete"
        />
    </div>
</template>
