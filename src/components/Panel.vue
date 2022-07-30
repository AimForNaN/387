<script setup>
    import { useObjectStore } from './../stores/objects.js';

    import Button from './Button.vue';
    import Properties from './Properties.vue';

    const objects = useObjectStore();
</script>

<template>
    <div id="objects">
        <div class="tools">
            <Button class="button" @click="objects.addRect()">Add Rect</Button>
            <Button class="button" @click="objects.addImage()">Add Image</Button>
        </div>
        <Properties class="flex-1" :object="objects.ActiveObject"></Properties>
    </div>
</template>

<style lang="less">
    #objects {
        @apply bg-stone-100 flex flex-col overflow-y-auto p-8 space-y-8;

        > * {
            @apply items-center space-y-2;
        }

        Button {
            @apply w-full;
        }
    }
</style>
