<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";
import { cn } from "~/lib/utils";

const props = withDefaults(
    defineProps<{
        modelValue?: string | number;
        class?: string;
        type?: InputTypeHTMLAttribute;
        placeholder?: string;
        disabled?: boolean;
        numeric?: boolean;
        name?: string;
        id?: string;
    }>(),
    {
        type: "text",
        numeric: false,
    },
);

const emit = defineEmits<{
    "update:modelValue": [value: string];
    change: [event: Event];
}>();

function sanitizeNumber(value: string): string {
    value = value.replace(/[^0-9.]/g, "");

    const [integer, ...decimals] = value.split(".");

    return decimals.length ? `${integer}.${decimals.join("")}` : integer || "";
}

function onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    emit("update:modelValue", props.numeric ? sanitizeNumber(value) : value);
}

function onChange(event: Event) {
    emit("change", event);
}
</script>

<template>
    <input
        :id="id"
        :name="name"
        :type="numeric ? 'text' : type"
        :inputmode="numeric ? 'decimal' : undefined"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
        @change="onChange"
        :class="
            cn(
                'border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                props.class,
            )
        "
    />
</template>
