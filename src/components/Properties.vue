<script setup>
    import { computed, customRef } from 'vue';
    import Node from './../lib/Node.js';

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
    const isNode = computed(() => {
        return props.object instanceof Node;
    });

    function getInputType(v) {
        switch (typeof v) {
            case 'object': {
                return false;
            }
            case 'number': {
                return 'number';
            }
        }
        return 'text';
    }
    function updateNode(node, j) {
        try {
            Object.assign(node, JSON.parse(j));
        } catch (e) {
            console.warn(e);
        }
    }
</script>

<template>
    <div id="properties" :class="{ html: isHtmlElement, node: isNode }" v-if="object">
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
        <template v-else-if="isNode">
            <header>Node</header>
            <!-- <label v-for="(v,k) in object" v-if="getInputType(object[k])">
                <span>{{k}}</span>
                <input :type="getInputType(object[k])" v-model="object[k]">
            </label> -->
            <label>
                <span>JSON</span>
                <textarea :value="JSON.stringify(object, null, 4)" @change="updateNode(object, $event.target.value)"></textarea>
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
            @apply gap-3 grid items-baseline;

            input, textarea {
                @apply w-full;
            }

            span {
                @apply capitalize text-xs text-right;
            }

            textarea {
                @apply h-44;
            }
        }

        &.html {
            label {
                grid-template-columns: 1fr 2fr;
            }
        }

        &.node {
            label {
                span {
                    @apply text-left;
                }
            }
        }
    }
</style>
