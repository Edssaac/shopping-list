<script setup lang="ts">
import { cn } from "~/lib/utils";

const props = defineProps<{
    class?: string;
}>();
</script>

<template>
    <div :class="cn('bg-muted animate-pulse rounded-md', props.class)" />
</template>
