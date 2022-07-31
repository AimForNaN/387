<script setup>
    const props = defineProps({
        duration: {
            type: Number,
            default: 0,
        },
        position: {
            type: Number,
            default: 0,
        },
    });

    function calculate(n) {
        return n ? n / (props.scaleFactor * props.scaleMultiplier) : 0;
    }
</script>

<template>
    <div class="timeline-tracker">
        <div class="blank"></div>
        <div class="track">
            <div class="board">
                <div class="tracker"></div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .timeline-tracker {
        @apply flex-shrink-0 grid relative;
        grid-template-columns: 320px auto;

        .blank {
            @apply border-r border-r-gray-400;
        }

        .track {
            @apply flex;

            .board {
                @apply flex h-8 justify-between;
            }
        }

        .tracker {
            @apply absolute bg-white h-full w-px;
        }
    }
</style>
