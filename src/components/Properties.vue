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
    const text = customRef((track, trigger) => {
        return {
            get() {
                track();
                return props.object && props.object.textContent;
            },
            set(v) {
                props.object.textContent = v;
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
            <header>{{name}}</header>
            <label>
                <span>Name</span>
                <input type="text" v-model="name">
            </label>
            <label>
                <span>Background</span>
                <input type="text" v-model="object.style.background">
            </label>
            <label v-if="isDivElement">
                <span>Border</span>
                <input type="text" v-model="object.style.border">
            </label>
            <label v-if="isDivElement">
                <span>Border Radius</span>
                <input type="text" v-model="object.style.borderRadius">
            </label>
            <label>
                <span>Width</span>
                <input type="text" v-model="object.style.width">
            </label>
            <label>
                <span>Height</span>
                <input type="text" v-model="object.style.height">
            </label>
            <label>
                <span>Left</span>
                <input type="text" v-model="object.style.left">
            </label>
            <label>
                <span>Top</span>
                <input type="text" v-model="object.style.top">
            </label>
            <label v-if="isDivElement">
                <span>Padding</span>
                <input type="text" v-model="object.style.padding">
            </label>
            <label v-if="isDivElement">
                <span class="self-start">Text</span>
                <textarea class="w-full" v-model="text"></textarea>
            </label>
            <template v-if="text">
                <label v-if="isDivElement">
                    <span>Text Color</span>
                    <input type="text" v-model="object.style.color">
                </label>
                <label v-if="isDivElement">
                    <span>Text Size</span>
                    <input type="text" v-model="object.style.fontSize">
                </label>
                <label v-if="isDivElement">
                    <span>Font</span>
                    <input type="text" v-model="object.style.fontFamily">
                </label>
            </template>
        </template>
        <template v-else>
            <header>Node</header>
            <label v-for="(v,k) in object">
                <span>{{k}}</span>
                <input type="text" v-model="object[k]">
            </label>
        </template>
    </div>
</template>

<style lang="less">
    #properties {
        @apply flex flex-col space-y-4;

        header {
            @apply text-3xl text-center text-gray-700;
        }

        label {
            @apply gap-3 grid items-center;
            grid-template-columns: 1fr 2fr;

            span {
                @apply capitalize text-xs text-right;
            }
        }
    }
</style>
