<script setup>
    import { computed } from 'vue';
    import { calculate } from './../lib/timeline.js';

    const props = defineProps({
        duration: {
            type: Number,
            default: 0,
        },
        position: {
            type: Number,
            default: 0,
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

    const steps = computed(() => {
        var {duration} = props;
        return duration ? (duration / 500) + 1 : 1;
    });
</script>

<template>
    <div class="timeline-tracker">
        <div class="blank">
            <slot></slot>
        </div>
        <div class="track">
            <div class="board" :style="{ width: calculate(props.duration, props.scaleFactor, props.scaleMultiplier) + 'px' }">
                <div class="tracker" :style="{ marginLeft: props.position + '%' }"></div>
                <div class="tick" :class="{ 'border-l h-3': i > 1 }" :style="{ marginRight: (calculate(500, props.scaleFactor, props.scaleMultiplier) - 1) + 'px' }" v-for="i in steps"></div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .timeline-tracker {
        @apply flex-shrink-0 grid;
        grid-template-columns: 320px auto;

        .blank {
            @apply border-r border-gray-500;
        }

        .tick {
            @apply border-gray-500;
        }

        .track {
            @apply flex;

            .board {
                @apply flex h-8 relative;
            }
        }

        .tracker {
            @apply absolute bg-white h-full w-px;
        }
    }
</style>
