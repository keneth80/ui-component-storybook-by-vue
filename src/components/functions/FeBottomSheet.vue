<template>
    <div class="bottom-sheet-root font-system column fill items-center justify-center">
        <div id="sheet" :aria-hidden="!status" class="bottom-sheet" role="dialog">
            <!-- sheet dim 처리 -->
            <div class="overlay" @click="closeSheet()"></div>
            <div class="contents">
                <header class="controls">
                    <div class="draggable-area" @touchstart="touchStartHandler" @touchend="touchEndHandler">
                        <div class="draggable-thumb"></div>
                    </div>
                    <button class="bottom-sheet-button close-sheet" type="button" @click="closeSheet()">
                        <img :src="xBtnIcon" alt="" />
                    </button>
                </header>

                <div v-if="slotHeader" class="sheet-header">
                    <slot name="header"></slot>
                </div>

                <main v-show="showBody" ref="contentsRef" class="sheet-body">
                    <slot name="contents"></slot>
                </main>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {ref, useSlots} from 'vue';
import {xBtnIcon} from '../../components-icon';

interface IFeBottomSheetProps {
    status: boolean;
}

withDefaults(defineProps<IFeBottomSheetProps>(), {status: false});

const emit = defineEmits(['bottom-sheet-close']);

const showBody = ref(false);
const contentsRef = ref(null);
const slotHeader = useSlots().header;

let touchStartPos = 0;
function touchStartHandler(event: TouchEvent) {
    touchStartPos = event.changedTouches[0].pageY;
    console.log('start', touchStartPos);
}

function touchEndHandler(event: TouchEvent) {
    const touchEndPos: number = event.changedTouches[0].pageY;
    if (showBody.value === false && touchEndPos < touchStartPos) {
        showBody.value = true;
    } else if (showBody.value === true && touchEndPos > touchStartPos) {
        showBody.value = false;
    }
    touchStartPos = 0;
}

function closeSheet() {
    emit('bottom-sheet-close');
}
</script>
<style scoped>
.column {
    display: flex;
    flex-direction: column;
}
.row.items-center,
.column.items-center {
    align-items: center;
}
.row.justify-center,
.column.justify-center {
    justify-content: center;
}

.fill {
    flex-grow: 1;
    flex-shrink: 0;
}

.font-system {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol';
}

.not-selectable {
    user-select: none;
}

.selectable {
    user-select: auto;
}

* {
    margin: 0;
    padding: 0;
}

:root {
    --bottom-sheet-background: #fff;
    --bottom-sheet-foreground: #000;
    --bottom-sheet-divider: #dcdcdc;
    --bottom-sheet-overlay: #888;
}

.bottom-sheet-root {
    background: #fff;
    color: #000;

    overflow: hidden;
    line-height: 1.5;

    -webkit-tap-highlight-color: transparent;
}

.bottom-sheet-button,
.bottom-sheet-input,
.bottom-sheet-textarea,
[contenteditable='true'] {
    box-sizing: border-box;
    padding: 1rem;

    border-radius: 1rem;
    border: 0.0625rem solid #dcdcdc;

    font-family: inherit;
    font-size: 1rem;

    background: #fff;
    color: #000;
}

.bottom-sheet-textarea {
    resize: none;
}

.bottom-sheet-button {
    cursor: pointer;
}

.bottom-sheet {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
    flex-shrink: 0;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: visible;
    transition: opacity 0.5s, visibility 0.5s;
    z-index: 1000;
}

.bottom-sheet .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: #888;
    opacity: 0.5;
}

.bottom-sheet[aria-hidden='true'] {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.bottom-sheet .contents {
    width: 100%;
    display: flex;
    flex-direction: column;

    border-radius: 1rem 1rem 0 0;

    background: #fff;

    overflow-y: hidden;

    transition: transform 0.5s, border-radius 0.5s;
    transform: translateY(0);

    max-width: 70rem;
    max-height: 100vh;

    box-sizing: border-box;
    box-shadow: 0px -4px 3px rgb(217 217 217 / 75%);
}

.bottom-sheet .contents:not(.not-selectable) {
    transition: transform 0.5s, border-radius 0.5s, height 0.5s;
}

.bottom-sheet .contents.fullscreen {
    border-radius: 0;
}

.bottom-sheet[aria-hidden='true'] .contents {
    transform: translateY(100%);
}

.controls {
    justify-content: end;
}

.bottom-sheet .controls {
    display: flex;
    flex-direction: column;
}

.bottom-sheet .draggable-area {
    width: 4rem;
    margin: auto;
    padding: 0.5rem;
}

.bottom-sheet .draggable-thumb {
    height: 0.25rem;
    background: #dcdcdc;
    border-radius: 0.125rem;
}

.bottom-sheet .close-sheet {
    border: none;
    text-align: right;
    padding: 0;
}

.bottom-sheet .close-sheet img {
    width: 17px;
    height: 17px;
    margin-right: 20px;
}

.bottom-sheet .sheet-header {
    height: 50px;
    width: 100%;
}

.bottom-sheet .sheet-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 1rem;
    padding: 20px;
    box-sizing: border-box;
}
</style>
