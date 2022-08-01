<script setup>
    import { calculate } from './../lib/timeline.js';
    import Icon from './Icon.vue';

    const $emit = defineEmits(['action']);

    const props = defineProps({
        active: null,
        noActivation: {
            type: Boolean,
            default: false,
        },
        noDelete: {
            type: Boolean,
            default: false,
        },
        nodes: {
            type: Array,
            default() {
                return [];
            },
        },
        noOrder: {
            type: Boolean,
            default: false,
        },
        object: {
            required: true,
        },
        scaleFactor: {
            type: Number,
            default: 100,
        },
        scaleMultiplier: {
            type: Number,
            default: 1,
        },
    });
</script>

<template>
    <div class="timeline-object">
        <div class="details" :class="{ active: props.active == props.object, hover: !noActivation }" @click="!noActivation && $emit('action', 'activate', props.object)">
            <div class="timeline-object-name">{{props.object.name}}</div>
            <div class="actions">
                <Icon class="action" icon="trash-can" @click.stop="$emit('action', 'remove-object', props.object)" v-if="!props.noDelete"></Icon>
                <Icon class="action" icon="arrow-up-bold" v-if="!props.noOrder"></Icon>
                <Icon class="action" icon="arrow-down-bold" v-if="!props.noOrder"></Icon>
                <Icon class="action" icon="plus-thick" title="Add Node" @click.stop="$emit('action', 'add-node', props.object)"></Icon>
            </div>
        </div>
        <div class="nodes">
            <div class="node" v-for="n in props.nodes" :key="n.id">
                <div class="leaf" :class="{ active: props.active == n }" :style="{ marginLeft: calculate(n.offset, props.scaleFactor, props.scaleMultiplier) + 'px', width: calculate(n.duration, props.scaleFactor, props.scaleMultiplier) + 'px' }" @click="$emit('action', 'activate', n)"></div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .timeline-object {
        @apply flex-shrink-0 grid;
        grid-template-columns: 320px auto;

        &-name {
            @apply flex flex-1 items-center;
        }

        .actions {
            @apply flex items-center;

            .action {
                @apply cursor-pointer p-2 text-gray-400 hover:text-white;
            }
        }

        .details {
            @apply border-r border-r-gray-400 flex items-baseline px-2 py-1;

            &.active {
                @apply bg-gray-600 ring-4 ring-sky-400 ring-inset;
            }

            &.hover {
                @apply cursor-pointer hover:bg-gray-600;
            }
        }

        .nodes {
            @apply flex flex-col flex-shrink-0 py-2 space-y-1;

            .node {
                @apply flex;

                .leaf {
                    @apply bg-sky-600 cursor-pointer h-8 rounded shadow hover:bg-sky-500;

                    &.active {
                        @apply bg-sky-400 ring-4 ring-sky-200 ring-inset;
                    }
                }
            }
        }
    }
</style>
