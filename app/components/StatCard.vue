<script setup lang="ts">
import type { Component } from "vue";
import Card from "~/components/ui/Card.vue";

defineProps<{
    label: string;
    value: string | number;
    icon?: Component;
    accent?: string;
}>();
</script>

<template>
    <Card class="p-4">
        <div class="flex items-center gap-3">
            <span
                v-if="icon"
                class="bg-muted text-muted-foreground flex size-9 items-center justify-center rounded-md"
                :class="accent"
            >
                <component :is="icon" class="size-4" />
            </span>

            <div>
                <p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    {{ label }}
                </p>
                <p class="text-foreground text-xl font-semibold tabular-nums">{{ value }}</p>
            </div>
        </div>
    </Card>
</template>
