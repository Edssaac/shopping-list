<script setup lang="ts">
import Skeleton from "~/components/ui/Skeleton.vue";
</script>

<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between gap-3">
            <Skeleton class="h-8 w-20" />
        </div>

        <div
            class="border-border bg-card grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-[1fr_auto] sm:items-end"
        >
            <div class="space-y-2">
                <Skeleton class="h-4 w-24" />
                <Skeleton class="h-9 w-full sm:w-96" />
            </div>

            <div class="space-y-2">
                <Skeleton class="h-4 w-14" />
                <Skeleton class="h-9 w-full sm:w-48" />
            </div>
        </div>

        <div class="space-y-4">
            <div class="flex justify-end flex-wrap gap-4 mt-4">
                <Skeleton class="h-18 w-full md:w-42" />
                <Skeleton class="h-18 w-full md:w-42" />
            </div>

            <div class="space-y-4 mt-8">
                <div class="flex items-center justify-between gap-3">
                    <Skeleton class="h-5 w-15" />
                    <Skeleton class="h-9 w-32" />
                </div>

                <div class="border-border overflow-hidden rounded-md border">
                    <div class="border-border flex items-center gap-4 border-b px-4 py-3">
                        <Skeleton class="h-4 w-32" />
                        <Skeleton class="h-4 w-20 ml-auto" />
                    </div>

                    <div
                        v-for="index in 5"
                        :key="index"
                        class="border-border flex items-center gap-4 border-b px-4 py-4 last:border-0"
                    >
                        <div class="flex-1 space-y-2">
                            <Skeleton class="h-4 w-40" />
                            <Skeleton class="h-3 w-24" />
                        </div>

                        <Skeleton class="h-8 w-8" />
                        <Skeleton class="h-8 w-8" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
