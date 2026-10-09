<script setup lang="ts">
import { TabsRoot } from "reka-ui";

defineProps<{ modelValue: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
    <TabsRoot :model-value="modelValue" @update:model-value="emit('update:modelValue', $event as string)">
        <slot />
    </TabsRoot>
</template>
