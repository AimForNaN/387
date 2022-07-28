<script setup>
    import { useObjectStore } from './../stores/objects.js';

    const objects = useObjectStore();
</script>

<template>
    <div id="timeline">
        <div class="toolbar">
        </div>
        <div class="objects">
            <div class="object" v-for="obj in objects.ObjectList"  :key="obj.id">
                <div class="left">
                    {{obj.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #timeline {
        @apply bg-gray-700 flex flex-col;

        .objects {
            @apply flex flex-col text-white;

            .object {
                @apply border-b border-gray-500 divide-gray-500;

                > * {
                    @apply p-2;
                }

                .left {
                    @apply border-gray-400 border-r cursor-pointer w-80 hover:bg-gray-600;
                }
            }
        }
    }
</style>
