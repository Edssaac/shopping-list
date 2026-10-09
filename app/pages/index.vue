<script setup lang="ts">
import { Plus, ListChecks, ShoppingBag, CheckCircle2 } from "lucide-vue-next";
import Button from "~/components/ui/Button.vue";
import AppShell from "~/components/AppShell.vue";
import StatCard from "~/components/StatCard.vue";
import ShoppingListTable from "~/components/ShoppingListTable.vue";
import ShoppingListTableSkeleton from "~/components/ShoppingListTableSkeleton.vue";
import { useShoppingLists } from "~/composables/useShoppingLists";

useHead({
    title: "Lista de Compras",
});

const router = useRouter();

const { lists, initialize, createList, duplicateList, deleteList } = useShoppingLists();

const stats = computed(() => ({
    total: lists.value.length,
    shopping: lists.value.filter((list) => list.isShopping()).length,
    finished: lists.value.filter((list) => list.isFinished()).length,
}));

function openList(id: string) {
    router.push(`/list/${id}`);
}

async function newList() {
    const list = await createList();

    router.push(`/list/${list.getId()}`);
}

const showSkeleton = ref(true);

onMounted(async () => {
    try {
        await withMinimumDelay(initialize(), 500);
    } finally {
        showSkeleton.value = false;
    }
});
</script>

<template>
    <AppShell>
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 class="text-foreground text-2xl font-semibold tracking-tight text-balance">
                    Suas listas de compras
                </h1>

                <p class="text-muted-foreground mt-1 text-sm">
                    Planeje, acompanhe e finalize suas compras em um só lugar.
                </p>
            </div>

            <Button size="lg" :disabled="showSkeleton" @click="newList">
                <Plus />
                Nova Lista
            </Button>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Total de listas" :value="stats.total" :icon="ListChecks" />

            <StatCard label="Comprando" :value="stats.shopping" :icon="ShoppingBag" accent="bg-sky-100 text-sky-700" />

            <StatCard
                label="Finalizadas"
                :value="stats.finished"
                :icon="CheckCircle2"
                accent="bg-emerald-100 text-emerald-700"
            />
        </div>

        <div class="mt-8">
            <ShoppingListTableSkeleton v-if="showSkeleton" />

            <ShoppingListTable v-else :lists="lists" @open="openList" @duplicate="duplicateList" @delete="deleteList" />
        </div>
    </AppShell>
</template>
