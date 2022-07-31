<script setup>
    import { computed, reactive } from 'vue';
    import { useObjectStore } from './../stores/objects.js';
    import Button from './Button.vue';
    import Icon from './Icon.vue';
    import TimelineObject from './TimelineObject.vue';
    import TimelineTracker from './TimelineTracker.vue';

    const objects = useObjectStore();
    const timeline = objects.Timeline;
    const state = reactive({
        Paused: true,
        Position: 0,
        ScaleFactor: 100,
        ScaleMultiplier: 1,
        Timeline: objects.Timeline,
    });


    const duration = computed(() => {
        return state.Timeline.duration;
    });

    function next() {
        state.Position = Math.min(100, state.Position + 1);
    }
    function onAction(action, object) {
        switch (action) {
            case 'activate': {
                objects.setActiveObject(object);
                break;
            }
            case 'add-node': {
                objects.addNode(object);
                break;
            }
            case 'remove-object': {
                objects.removeObject(object);
                break;
            }
        }
    }
    function pause() {
        state.Timeline.pause();
    }
    function play() {
        state.Timeline = objects.Timeline;
        state.Timeline.update = update;
        state.Timeline.play();
    }
    function prev() {
        state.Position = Math.max(0, state.Position - 1);
    }
    function update(t) {
        state.Paused = t.paused;
        state.Position = t.progress;
    }
</script>

<template>
    <div id="timeline">
        <div class="toolbar">
            <Button icon="play" v-if="state.Paused"></Button>
            <Button icon="pause" v-else></Button>
            <!-- <Button icon="arrow-left-bold-box" @mousedown="prev"></Button>
            <Button icon="arrow-right-bold-box" @mousedown="next"></Button> -->
        </div>
        <TimelineTracker></TimelineTracker>
        <div class="objects">
            <TimelineObject :active="objects.ActiveObject" :nodes="objects.getNodes(obj)" :key="obj.id" :object="obj" :scale-factor="state.ScaleFactor" :scale-multiplier="state.ScaleMultiplier" v-for="obj in objects.ObjectList" @action="onAction"></TimelineObject>
        </div>
    </div>
</template>

<style lang="less">
    #timeline {
        @apply bg-gray-700 flex flex-col overflow-hidden;

        .objects {
            @apply flex flex-1 flex-col overflow-auto text-white;
        }

        .timeline-object, .timeline-tracker {
            @apply border-b border-b-gray-600;
        }

        .toolbar {
            @apply border-b border-gray-500 flex text-2xl text-white;

            > * {
                @apply cursor-pointer px-3 py-2 hover:bg-gray-600;
            }
        }
    }
</style>
