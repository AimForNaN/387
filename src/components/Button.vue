<script setup>
    import Icon from './Icon.vue';

    const props = defineProps({
        icon: String,
    });
</script>

<template>
    <button>
        <Icon :icon="props.icon"></Icon>
        <slot></slot>
    </button>
</template>
