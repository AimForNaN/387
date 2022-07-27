<script setup>
    import { useObjectStore } from './../stores/objects.js';
    import Properties from './Properties.vue';

    const objects = useObjectStore();
</script>

<template>
    <div id="objects">
        <div class="tools">
            <button class="button">Add Text</button>
            <button class="button" @click="objects.addRect()">Add Rect</button>
            <button class="button" @click="objects.addImage()">Add Image</button>
        </div>
        <Properties class="flex-1"></Properties>
    </div>
</template>

<style lang="less">
    #objects {
        @apply bg-stone-100 flex flex-col p-8 space-y-8;

        > * {
            @apply items-center space-y-2;
        }

        button {
            @apply w-full;
        }
    }
</style>
