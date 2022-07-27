<script setup>
    import { useObjectStore } from './../stores/objects.js';

    const objects = useObjectStore();
</script>

<template>
    <div id="objects">
        <div>
            <button class="button">Add Text</button>
            <button class="button" @click="objects.addRect()">Add Rect</button>
            <button class="button" @click="objects.addImage()">Add Image</button>
        </div>
        <div class="flex-1 overflow-y">
        </div>
    </div>
</template>

<style lang="less">
    #objects {
        @apply bg-stone-100 flex flex-col;

        > * {
            @apply flex flex-col items-center p-8 space-y-2;
        }

        button {
            @apply w-full;
        }
    }
</style>
