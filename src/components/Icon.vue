<script setup>
    const props = defineProps({
        icon: String,
    });
</script>

<template>
    <i :class="['mdi mdi-' + props.icon]"><slot></slot></i>
</template>
