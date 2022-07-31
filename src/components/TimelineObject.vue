<script setup>
    import Icon from './Icon.vue';

    const $emit = defineEmits(['action']);

    const props = defineProps({
        active: null,
        nodes: {
            type: Array,
            default() {
                return [];
            },
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

    function calculate(n) {
        return n ? n / (props.scaleFactor * props.scaleMultiplier) : 0;
    }
</script>

<template>
    <div class="timeline-object" :title="props.object.id">
        <div class="details" :class="{ active: props.active == props.object }" @click="$emit('action', 'activate', props.object)">
            <div class="timeline-object-name">{{props.object.name}}</div>
            <div class="actions">
                <Icon class="action" icon="trash-can" @click.stop="$emit('action', 'remove-object', props.object)"></Icon>
                <Icon class="action" icon="arrow-up-bold"></Icon>
                <Icon class="action" icon="arrow-down-bold"></Icon>
                <Icon class="action" icon="plus-thick" @click.stop="$emit('action', 'add-node', props.object)"></Icon>
            </div>
        </div>
        <div class="nodes">
            <div class="node" v-for="n in props.nodes" :key="n.id">
                <div class="leaf" :class="{ active: props.active == n }" :style="{ marginLeft: calculate(n.offset) + '%', width: calculate(n.duration) + '%' }" @click="$emit('action', 'activate', n)"></div>
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
                @apply p-2 text-gray-400 hover:text-white;
            }
        }

        .details {
            @apply border-r border-r-gray-400 cursor-pointer flex items-baseline px-2 py-1 hover:bg-gray-600;

            &.active {
                @apply ring-4 ring-sky-400 ring-inset;
            }
        }

        .nodes {
            @apply flex flex-col flex-shrink-0 py-2 space-y-1;

            .node {
                @apply flex;

                .leaf {
                    @apply bg-sky-500 cursor-pointer h-8 rounded shadow hover:bg-sky-400;

                    &.active {
                        @apply ring-4 ring-sky-200 ring-inset;
                    }
                }
            }
        }
    }
</style>
