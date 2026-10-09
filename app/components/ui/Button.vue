<script setup lang="ts">
import { computed } from "vue";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm cursor-pointer",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer",
                ghost: "hover:bg-accent hover:text-accent-foreground cursor-pointer",
                link: "text-primary underline-offset-4 hover:underline cursor-pointer",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-11 rounded-md px-6",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

const props = withDefaults(
    defineProps<{
        variant?: ButtonVariants["variant"];
        size?: ButtonVariants["size"];
        type?: "button" | "submit" | "reset";
        disabled?: boolean;
        class?: string;
    }>(),
    {
        type: "button",
    },
);

const classes = computed(() => cn(buttonVariants({ variant: props.variant, size: props.size }), props.class));
</script>

<template>
    <button :type="type" :disabled="disabled" :class="classes">
        <slot />
    </button>
</template>
