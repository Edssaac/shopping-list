<script setup lang="ts">
import {
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "reka-ui";
import { X } from "lucide-vue-next";

defineProps<{
    open: boolean;
    title?: string;
    description?: string;
}>();

const emit = defineEmits<{ "update:open": [value: boolean] }>();
</script>

<template>
    <DialogRoot :open="open" @update:open="emit('update:open', $event)">
        <DialogPortal>
            <DialogOverlay
                class="data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40"
            />
            <DialogContent
                class="border-border bg-background data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border p-6 shadow-lg"
            >
                <div class="mb-4 flex items-start justify-between gap-4">
                    <div class="space-y-1">
                        <DialogTitle v-if="title" class="text-foreground text-lg font-semibold">
                            {{ title }}
                        </DialogTitle>
                        <DialogDescription v-if="description" class="text-muted-foreground text-sm">
                            {{ description }}
                        </DialogDescription>
                    </div>
                    <DialogClose
                        class="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors"
                        aria-label="Fechar"
                    >
                        <X class="size-4" />
                    </DialogClose>
                </div>
                <slot />
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>
