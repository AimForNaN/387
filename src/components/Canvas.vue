<script setup>
    import { reactive, ref } from 'vue';
    import { useObjectStore } from './../stores/objects.js';

    const objects = useObjectStore();

    const frame = ref(null);
    const state = reactive({
        Height: 500,
        Width: 1000,
    });

    objects.$subscribe((mutation, state) => {
        var {events} = mutation;
        var {key, newValue, oldValue, type} = events;
        if (newValue instanceof HTMLElement || oldValue instanceof HTMLElement) {
            switch (type) {
                case 'add': {
                    frame.value.contentWindow.document.body.appendChild(newValue);
                    break;
                }
                case 'delete': {
                    oldValue.parentNode.removeChild(oldValue);
                    break;
                }
                default: {
                    console.log(mutation);
                }
            }
        }
    });
</script>

<template>
    <div id="canvas">
        <div class="toolbar">
            <span>Width:</span>
            <input type="number" step="100" v-model="state.Width">
            <span>Height:</span>
            <input type="number" step="100" v-model="state.Height">
        </div>
        <div class="wrapper">
            <iframe src="/inject.html" :height="state.Height" :width="state.Width" sandbox="allow-same-origin allow-scripts" ref="frame"></iframe>
        </div>
    </div>
</template>

<style lang="less">
    #canvas {
        @apply flex flex-col overflow-hidden;

        iframe {
            @apply bg-white m-auto rounded-sm shadow-lg;
        }

        .toolbar {
            @apply bg-gray-700 flex items-center p-2 space-x-2 text-white;
        }

        .wrapper {
            @apply flex flex-1 overflow-auto p-12;
        }
    }
</style>
