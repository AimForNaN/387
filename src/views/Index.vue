<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <div id="index">
        <div class="panel">
            <div class="font-serif italic text-5xl">
                <span>three</span>
                <span class="-my-3 text-lg">&times;</span>
                <span>eight</span>
                <span>seven</span>
            </div>
            <div class="space-y-2">
                <RouterLink class="button" :to="{ name: 'doc' }">New document</RouterLink>
                <button class="button">Open document</button>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #index {
        @apply bg-stone-50 flex items-center justify-center;

        .panel {
            @apply bg-white border divide-x flex flex-col rounded shadow e('lg:w-1/2') md:flex-row;

            > * {
                @apply flex flex-col items-center justify-center px-8 py-14 e('lg:w-1/2');
            }
        }
    }
</style>
