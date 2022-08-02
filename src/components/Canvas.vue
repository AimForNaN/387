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
        var el = newValue ?? oldValue;
        if (el instanceof HTMLElement) {
            let w = frame.value.contentWindow;
            switch (type) {
                case 'add': {
                    w.addElement(el)
                    break;
                }
                case 'delete': {
                    w.removeElement(el);
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
            <label>
                <span>Width:</span>
                <input type="number" step="100" v-model="state.Width">
            </label>
            <label>
                <span>Height:</span>
                <input type="number" step="100" v-model="state.Height">
            </label>
            <span class="flex-1"></span>
            <button class="toolbar-item">Preview</button>
            <button class="toolbar-item">Export</button>
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
            @apply bg-white m-auto flex-shrink-0 rounded-sm shadow-lg;
        }

        .toolbar {
            @apply bg-gray-700 flex items-center px-3 py-2 space-x-4 text-white;

            button {
                @apply text-opacity-70 text-white transition-colors hover:text-opacity-100;
            }

            label {
                @apply flex items-center space-x-3;
            }
        }

        .wrapper {
            @apply flex flex-1 overflow-auto p-12;
        }
    }
</style>
