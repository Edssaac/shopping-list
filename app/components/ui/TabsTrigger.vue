<script setup lang="ts">
import { TabsTrigger } from "reka-ui";
import { cn } from "~/lib/utils";

const props = defineProps<{ value: string; class?: string }>();
</script>

<template>
    <TabsTrigger
        :value="value"
        :class="
            cn(
                'focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:size-4',
                props.class,
            )
        "
    >
        <slot />
    </TabsTrigger>
</template>
