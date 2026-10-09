<script setup lang="ts">
import { Package, Wallet } from "lucide-vue-next";
import Card from "~/components/ui/Card.vue";
import { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";

const props = defineProps<{
    items: ShoppingListItem[];
    totalValue: string;
}>();

const summary = computed(() => {
    const items = props.items;

    return {
        total: items.length,
        totalValue: props.totalValue,
    };
});
</script>

<template>
    <div class="md:flex md:justify-end">
        <div class="grid grid-cols-2 gap-4">
            <Card class="col-span-2 p-4 md:col-span-1">
                <div class="flex items-center gap-3">
                    <span
                        class="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-md"
                    >
                        <Package class="size-4" />
                    </span>

                    <div>
                        <p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Total de itens</p>
                        <p class="text-foreground text-xl font-semibold tabular-nums">
                            {{ summary.total }}
                        </p>
                    </div>
                </div>
            </Card>

            <Card class="bg-primary text-primary-foreground col-span-2 p-4 md:col-span-1">
                <div class="flex items-center gap-3">
                    <span class="bg-primary-foreground/15 flex size-9 shrink-0 items-center justify-center rounded-md">
                        <Wallet class="size-4" />
                    </span>

                    <div>
                        <p class="text-primary-foreground/80 text-xs font-medium tracking-wide uppercase">
                            Valor total
                        </p>
                        <p class="text-xl font-semibold tabular-nums">
                            {{ summary.totalValue }}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>
