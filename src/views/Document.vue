<script setup>
    import { RouterLink } from 'vue-router';
    import Canvas from './../components/Canvas.vue';
    import Panel from './../components/Panel.vue';
    import Timeline from './../components/Timeline.vue';
</script>

<template>
    <div id="document">
        <Panel class="row-span-2"></Panel>
        <Canvas></Canvas>
        <Timeline></Timeline>
    </div>
</template>

<style lang="less">
    #document {
        @apply bg-gray-400 grid;

        #canvas {
            @apply h-full w-full;
        }

        #panel {
            @apply border-r-4 border-gray-700;
        }
    }

    @screen sm {
        #document {
            grid-template-columns: 1fr 2fr;
            grid-template-rows: 2fr 1fr;
        }
    }

    @screen lg {
        #document {
            grid-template-columns: 1fr 3fr;
        }
    }

    @screen 2xl {
        #document {
            grid-template-columns: 1fr 5fr;
            grid-template-rows: 2.25fr 1fr;
        }
    }
</style>
