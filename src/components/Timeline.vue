<script setup>
    import { computed, reactive } from 'vue';
    import { useObjectStore } from './../stores/objects.js';
    import Button from './Button.vue';
    import Icon from './Icon.vue';

    const objects = useObjectStore();
    const timeline = objects.Timeline;
    const state = reactive({
        Paused: timeline.paused,
        Position: ~~timeline.progress,
    });
    console.log(timeline);

    timeline.update = function (t) {
        state.Paused = t.paused;
        state.Position = t.progress;
    }

    const duration = computed(() => {
        return timeline.duration;
    });

    function next() {
        state.Position = Math.min(100, state.Position + 1);
    }
    function pause() {
        timeline.pause();
    }
    function play() {
        timeline.play();
    }
    function prev() {
        state.Position = Math.max(0, state.Position - 1);
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
        <div class="wrapper">
            <div class="tracker" :style="{ marginLeft: state.Position + '%' }"></div>
            <div class="objects">
                <template v-for="obj in objects.ObjectList">
                    <div class="object" :class="{ active: obj == objects.ActiveObject }" @click="objects.setActiveObject(obj)">
                        <div class="flex-1">{{obj.name}}</div>
                        <div class="actions">
                            <Icon class="action" icon="trash-can" @click.stop="objects.removeObject(obj)"></Icon>
                            <Icon class="action" icon="arrow-up-bold"></Icon>
                            <Icon class="action" icon="arrow-down-bold"></Icon>
                            <Icon class="action" icon="plus-thick"></Icon>
                        </div>
                    </div>
                    <div class="nodes"></div>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #timeline {
        @apply bg-gray-700 flex flex-col overflow-hidden;

        .active {
            @apply ring-4 ring-sky-400 ring-inset;
        }

        .objects {
            @apply grid overflow-auto text-white;
            grid-template-columns: 320px auto;

            .nodes {
                @apply border-b border-gray-600 flex-shrink-0 h-14 p-2;
            }

            .object {
                @apply border-b border-r border-b-gray-600 border-r-gray-400 cursor-pointer divide-gray-500 flex flex-shrink-0 h-14 items-center p-2 hover:bg-gray-600;

                .actions {
                    .action {
                        @apply p-2 text-gray-400 hover:text-white;
                    }
                }
            }
        }

        .toolbar {
            @apply border-b border-gray-500 flex text-2xl text-white;

            > * {
                @apply cursor-pointer px-3 py-2 hover:bg-gray-600;
            }
        }

        .tracker {
            @apply bg-white fixed h-full w-px;
            transform: translateX(320px);
        }

        .wrapper {
            @apply flex flex-col;
        }
    }
</style>
