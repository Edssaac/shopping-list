<script setup lang="ts">
import Badge from "~/components/ui/Badge.vue";
import { SHOPPING_LIST_STATUS, type ShoppingListStatus } from "~~/core/domain/shopping-list/enums/ShoppingListStatus";

const props = defineProps<{
    kind: "list" | "item";
    status: ShoppingListStatus;
}>();

const variant = computed(() => {
    if (props.status === SHOPPING_LIST_STATUS.FINISHED) {
        return "success";
    }

    if (props.status === SHOPPING_LIST_STATUS.SHOPPING) {
        return "info";
    }

    return "muted";
});
</script>

<template>
    <Badge :variant="variant">{{ status.title }}</Badge>
</template>
