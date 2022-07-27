<script setup>
    import { RouterView } from 'vue-router';
</script>

<template>
    <RouterView class="view" />
</template>

<style lang="less">
    .view {
        @apply fixed inset-0;
    }
</style>
