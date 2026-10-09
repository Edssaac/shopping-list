<script setup lang="ts">
import Skeleton from "~/components/ui/Skeleton.vue";
</script>

<template>
    <div class="border-border overflow-hidden rounded-md border">
        <div class="bg-muted/40 border-border grid grid-cols-3 gap-4 border-b px-4 py-3">
            <Skeleton class="h-4 w-32" />
            <Skeleton class="ml-auto h-4 w-20" />
            <Skeleton class="ml-auto h-4 w-20" />
        </div>

        <div
            v-for="index in 5"
            :key="index"
            class="border-border grid grid-cols-3 items-center gap-4 border-b px-4 py-4 last:border-0"
        >
            <div class="space-y-2">
                <Skeleton class="h-4 w-30" />
                <Skeleton class="h-3 w-14 md:hidden" />
                <Skeleton class="h-3 w-24 md:hidden" />
            </div>

            <Skeleton class="ml-auto h-4 w-20" />

            <Skeleton class="ml-auto h-1 w-4" />
        </div>
    </div>
</template>
