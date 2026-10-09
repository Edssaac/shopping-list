<script setup lang="ts">
import { TabsList } from "reka-ui";
import { cn } from "~/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
    <TabsList
        :class="
            cn(
                'bg-muted text-muted-foreground inline-flex h-10 items-center justify-center gap-1 rounded-lg p-1',
                props.class,
            )
        "
    >
        <slot />
    </TabsList>
</template>
