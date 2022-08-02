<script setup>
    import { useObjectStore } from './../stores/objects.js';

    import Button from './Button.vue';
    import Properties from './Properties.vue';

    const objects = useObjectStore();
</script>

<template>
    <div id="panel">
        <header>
            three eight seven
        </header>
        <div class="tools">
            <Button class="button" @click="objects.addRect()">Add Rect</Button>
            <Button class="button" @click="objects.addImage()">Add Image</Button>
        </div>
        <Properties class="flex-1" :object="objects.ActiveObject"></Properties>
    </div>
</template>

<style lang="less">
    #panel {
        @apply bg-white flex flex-col overflow-y-auto p-8 space-y-8;

        > header {
            @apply font-serif italic text-center text-3xl text-gray-700;
        }

        .tools {
            @apply space-y-2;

            button {
                @apply w-full;
            }
        }
    }
</style>
