<script setup lang="ts">
import {
    SelectRoot,
    SelectTrigger,
    SelectValue,
    SelectIcon,
    SelectPortal,
    SelectContent,
    SelectViewport,
    SelectItem,
    SelectItemText,
    SelectItemIndicator,
} from "reka-ui";
import { ChevronDown, Check } from "lucide-vue-next";
import { cn } from "~/lib/utils";

interface Option {
    label: string;
    value: string;
}

const props = defineProps<{
    modelValue: string;
    options: Option[];
    placeholder?: string;
    class?: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
    change: [value: string];
}>();

function onValueChange(value: string) {
    emit("update:modelValue", value);
    emit("change", value);
}
</script>

<template>
    <SelectRoot :model-value="modelValue" @update:model-value="onValueChange">
        <SelectTrigger
            :class="
                cn(
                    'border-input bg-background focus:ring-ring data-placeholder:text-muted-foreground flex h-9 min-w-36 items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus:ring-2 focus:outline-none cursor-pointer',
                    props.class,
                )
            "
        >
            <SelectValue :placeholder="placeholder ?? 'Selecione'" />
            <SelectIcon as-child>
                <ChevronDown class="size-4 opacity-60" />
            </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
            <SelectContent
                position="popper"
                :side-offset="6"
                class="border-border bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=open]:fade-in-0 z-50 min-w-(--reka-select-trigger-width) overflow-hidden rounded-md border shadow-md"
            >
                <SelectViewport class="p-1">
                    <SelectItem
                        v-for="option in options"
                        :key="option.value"
                        :value="option.value"
                        class="data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none"
                    >
                        <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                            <Check class="size-4" />
                        </SelectItemIndicator>
                        <SelectItemText>{{ option.label }}</SelectItemText>
                    </SelectItem>
                </SelectViewport>
            </SelectContent>
        </SelectPortal>
    </SelectRoot>
</template>
