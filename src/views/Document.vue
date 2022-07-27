<script setup>
    import { RouterLink } from 'vue-router';
    import Canvas from './../components/Canvas.vue';
    import Objects from './../components/Objects.vue';
    import Properties from './../components/Properties.vue';
    import Timeline from './../components/Timeline.vue';
</script>

<template>
    <div id="document">
        <Objects></Objects>
        <Canvas></Canvas>
        <Properties></Properties>
        <Timeline class="col-span-3"></Timeline>
    </div>
</template>

<style lang="less">
    #document {
        @apply bg-gray-400 grid;

        #canvas {
            @apply h-full w-full;
        }
    }

    @screen sm {
        #document {
            grid-template-columns: 1fr 1.75fr 1fr;
            grid-template-rows: 1fr 0.45fr;
        }
    }

    @screen xl {
        #document {
            grid-template-columns: 0.75fr 1.75fr 0.75fr;
            grid-template-rows: 1fr 0.45fr;
        }
    }

    @screen 2xl {
        #document {
            grid-template-columns: 0.5fr 2fr 0.5fr;
            grid-template-rows: 1fr 0.45fr;
        }
    }
</style>
