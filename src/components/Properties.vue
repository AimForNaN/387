<script setup>
    import { computed, customRef } from 'vue';

    const props = defineProps({
        object: null,
    });

    const object = computed(() => {
        return props.object;
    });
    const name = customRef((track, trigger) => {
        return {
            get() {
                track();
                return props.object && props.object.name;
            },
            set(v) {
                props.object.name = v;
                trigger();
            },
        };
    });
    const isDivElement = computed(() => {
        return props.object instanceof HTMLDivElement;
    });
    const isHtmlElement = computed(() => {
        return props.object instanceof HTMLElement;
    });
</script>

<template>
    <div id="properties" v-if="object">
        <template v-if="isHtmlElement">
            <header>
                {{name}}
            </header>
            <label>
                <b>Name</b>
                <input type="text" v-model="name">
            </label>
            <label>
                <b>Background Color</b>
                <input type="text" v-model="object.style.backgroundColor">
            </label>
            <label v-if="isDivElement">
                <b>Border</b>
                <input type="text" v-model="object.style.border">
            </label>
            <label v-if="isDivElement">
                <b>Border Radius</b>
                <input type="text" v-model="object.style.borderRadius">
            </label>
            <label>
                <b>Width</b>
                <input type="text" v-model="object.style.width">
            </label>
            <label>
                <b>Height</b>
                <input type="text" v-model="object.style.height">
            </label>
            <label>
                <b>Left</b>
                <input type="text" v-model="object.style.left">
            </label>
            <label>
                <b>Top</b>
                <input type="text" v-model="object.style.top">
            </label>
            <label v-if="isDivElement">
                <b>Padding</b>
                <input type="text" v-model="object.style.padding">
            </label>
            <label v-if="isDivElement">
                <b>Text</b>
                <textarea class="h-24" v-model="object.textContent"></textarea>
            </label>
        </template>
        <template v-else></template>
    </div>
</template>

<style lang="less">
    #properties {
        @apply flex flex-col space-y-4;

        header {
            @apply text-3xl;
        }

        label {
            @apply flex flex-col self-stretch;
        }
    }
</style>
