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
            @apply flex flex-col h-10 justify-between;
        }
    }
</style>
