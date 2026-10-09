<script setup lang="ts">
import { cn } from "~/lib/utils";

const props = defineProps<{
    modelValue?: string | number;
    class?: string;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
    change: [event: Event];
}>();

function onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    emit("update:modelValue", value);
}

function onChange(event: Event) {
    emit("change", event);
}
</script>

<template>
    <textarea
        data-slot="textarea"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="onInput"
        @change="onChange"
        :class="
            cn(
                'border-input placeholder:text-muted-foreground dark:bg-input/30 focus-visible:ring-ring flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                props.class,
            )
        "
    />
</template>
