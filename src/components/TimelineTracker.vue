<script setup>
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
</script>

<template>
    <div class="timeline-tracker">
        <div class="blank">{{props.duration}}</div>
        <div class="track">
            <div class="board" :style="{ width: calculate(props.duration, props.scaleFactor, props.scaleMultiplier) + 'px' }">
                <div class="tracker" :style="{ marginLeft: props.position + '%' }"></div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .timeline-tracker {
        @apply flex-shrink-0 grid;
        grid-template-columns: 320px auto;

        .blank {
            @apply border-r border-r-gray-400;
        }

        .track {
            @apply flex;

            .board {
                @apply flex h-8 justify-between relative;
            }
        }

        .tracker {
            @apply absolute bg-white h-full w-px;
        }
    }
</style>
