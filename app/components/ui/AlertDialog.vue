<script setup lang="ts">
import {
    AlertDialogRoot,
    AlertDialogTrigger,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "reka-ui";
import Button from "./Button.vue";

withDefaults(
    defineProps<{
        title?: string;
        description?: string;
        confirmLabel?: string;
        cancelLabel?: string;
    }>(),
    {
        title: "Tem certeza?",
        description: "Esta ação não pode ser desfeita.",
        confirmLabel: "Confirmar",
        cancelLabel: "Cancelar",
    },
);

const emit = defineEmits<{ confirm: [] }>();
</script>

<template>
    <AlertDialogRoot>
        <AlertDialogTrigger as-child>
            <slot name="trigger" />
        </AlertDialogTrigger>
        <AlertDialogPortal>
            <AlertDialogOverlay
                class="data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40"
            />
            <AlertDialogContent
                class="border-border bg-background data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border p-6 shadow-lg"
            >
                <AlertDialogTitle class="text-foreground text-lg font-semibold">
                    {{ title }}
                </AlertDialogTitle>
                <AlertDialogDescription class="text-muted-foreground mt-2 text-sm">
                    {{ description }}
                </AlertDialogDescription>
                <div class="mt-6 flex justify-end gap-2">
                    <AlertDialogCancel as-child>
                        <Button variant="outline">{{ cancelLabel }}</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction as-child>
                        <Button variant="destructive" @click="emit('confirm')">
                            {{ confirmLabel }}
                        </Button>
                    </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialogPortal>
    </AlertDialogRoot>
</template>
