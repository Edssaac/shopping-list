<script setup lang="ts">
import { cn } from "~/lib/utils";

const props = defineProps<{ for?: string; class?: string }>();
</script>

<template>
    <label :for="props.for" :class="cn('text-foreground text-sm leading-none font-medium', props.class)">
        <slot />
    </label>
</template>
