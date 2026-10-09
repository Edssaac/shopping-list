<script setup lang="ts">
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from "reka-ui";
import { ChevronDown, StickyNote } from "lucide-vue-next";

defineProps<{ notes: string }>();

const open = ref(false);
</script>

<template>
    <CollapsibleRoot v-model:open="open" class="mt-1.5">
        <CollapsibleTrigger
            class="text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background flex items-center gap-1 rounded-md text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none cursor-pointer"
        >
            <StickyNote class="size-3.5" />

            <span>{{ open ? "Ocultar observação" : "Ver observação" }}</span>

            <ChevronDown class="size-3.5 transition-transform duration-200" :class="open && 'rotate-180'" />
        </CollapsibleTrigger>

        <CollapsibleContent
            class="overflow-hidden pt-2 data-[state=closed]:animate-[collapsible-up_150ms_ease-out] data-[state=open]:animate-[collapsible-down_150ms_ease-out]"
        >
            <p class="bg-muted mt-1 rounded-md px-2.5 py-2 text-justify text-sm leading-relaxed font-normal">
                {{ notes }}
            </p>
        </CollapsibleContent>
    </CollapsibleRoot>
</template>
