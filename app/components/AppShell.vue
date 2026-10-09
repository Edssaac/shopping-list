<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import Button from "~/components/ui/Button.vue";

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

const toggleTheme = () => {
    colorMode.preference = isDark.value ? "light" : "dark";
};
</script>

<template>
    <div class="bg-background min-h-screen">
        <header class="border-border bg-background/80 sticky top-0 z-30 border-b backdrop-blur">
            <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
                <NuxtLink to="/" class="flex items-center gap-2.5">
                    <span class="flex size-9 items-center justify-center rounded-lg">
                        <img src="/icon.png" alt="" srcset="" />
                    </span>
                    <span class="text-foreground text-base font-semibold tracking-tight"> Listas de Compras </span>
                </NuxtLink>

                <Button
                    variant="ghost"
                    size="icon"
                    :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
                    @click="toggleTheme"
                    class="cursor-pointer"
                >
                    <ClientOnly>
                        <Moon v-if="!isDark" />
                        <Sun v-else />
                    </ClientOnly>
                </Button>
            </div>
        </header>

        <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
            <slot />
        </main>
    </div>
</template>
