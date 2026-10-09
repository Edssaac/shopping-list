<script setup lang="ts">
import { DropdownMenuItem } from "reka-ui";
import { cn } from "~/lib/utils";

const props = defineProps<{ class?: string; disabled?: boolean }>();
const emit = defineEmits<{ select: [] }>();
</script>

<template>
    <DropdownMenuItem
        :disabled="disabled"
        @select="emit('select')"
        :class="
            cn(
                'focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
                props.class,
            )
        "
    >
        <slot />
    </DropdownMenuItem>
</template>
