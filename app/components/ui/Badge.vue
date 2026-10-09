<script setup lang="ts">
import { computed } from "vue";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary/10 text-primary",
                secondary: "border-transparent bg-secondary text-secondary-foreground",
                outline: "border-border text-foreground",
                success: "border-transparent bg-emerald-100 text-emerald-700",
                warning: "border-transparent bg-amber-100 text-amber-700",
                info: "border-transparent bg-sky-100 text-sky-700",
                muted: "border-transparent bg-muted text-muted-foreground",
                destructive: "border-transparent bg-red-100 text-red-700",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

type BadgeVariants = VariantProps<typeof badgeVariants>;

const props = defineProps<{
    variant?: BadgeVariants["variant"];
    class?: string;
}>();

const classes = computed(() => cn(badgeVariants({ variant: props.variant }), props.class));
</script>

<template>
    <span :class="classes">
        <slot />
    </span>
</template>
