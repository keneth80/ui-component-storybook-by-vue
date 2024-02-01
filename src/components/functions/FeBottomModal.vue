<template>
    <div class="bottom-modal-root font-system column fill items-center justify-center">
        <div id="modal" :aria-hidden="!status" class="bottom-modal" role="dialog">
            <!-- modal dim 처리 -->
            <div class="overlay" @click="closeModal()"></div>
            <div class="contents">
                <header class="controls">
                    <div class="draggable-area"></div>
                    <button class="bottom-modal-button close-modal" type="button" @click="closeModal()">
                        <img :src="xIcon" style="width: 24px; height: 24px" alt="" />
                    </button>
                </header>

                <main class="modal-body" :class="{full: isFull === true}">
                    <div class="modal-body-container">
                        <slot name="contents"></slot>
                    </div>
                </main>

                <div class="bottom-modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {xIcon} from '../../components-icon';
import {defineComponent, SetupContext} from 'vue';
export default defineComponent({
    props: {
        status: {
            type: Boolean,
            required: true,
            default: false
        },
        isFull: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    setup(props: Readonly<{status: boolean; isFull: boolean}>, {emit}: SetupContext) {
        console.log('props', props.status);
        const closeModal = () => {
            emit('bottom-modal-close', false);
        };

        return {
            closeModal,
            xIcon
        };
    }
});
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
    --bottom-modal-background: #fff;
    --bottom-modal-foreground: #000;
    --bottom-modal-divider: #dcdcdc;
    --bottom-modal-overlay: #888;
}

.bottom-modal-root {
    background: #fff;
    color: #000;

    overflow: hidden;
    line-height: 1.5;

    -webkit-tap-highlight-color: transparent;
}

.bottom-modal-button,
.bottom-modal-input,
.bottom-modal-textarea,
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

.bottom-modal-textarea {
    resize: none;
}

.bottom-modal-button {
    cursor: pointer;
}

.bottom-modal {
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

.bottom-modal[aria-hidden='true'] {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.bottom-modal .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: #888;
    opacity: 0.5;
}

.bottom-modal .contents {
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
}

.bottom-modal .contents:not(.not-selectable) {
    transition: transform 0.5s, border-radius 0.5s, height 0.5s;
}

.bottom-modal .contents.fullscreen {
    border-radius: 0;
}

.bottom-modal[aria-hidden='true'] .contents {
    transform: translateY(100%);
}

.controls {
    justify-content: end;
}

.bottom-modal .controls {
    display: flex;
    flex-direction: column;
}

.bottom-modal .draggable-area {
    width: 4rem;
    margin: auto;
    padding: 0.5rem;
    cursor: grab;
}

.bottom-modal .draggable-thumb {
    height: 0.25rem;
    background: #dcdcdc;
    border-radius: 0.125rem;
}

.bottom-modal .close-modal {
    border: none;
    text-align: right;
    padding: 0;
}

.bottom-modal .close-modal img {
    width: 17px;
    height: 17px;
    margin-right: 20px;
}

.bottom-modal .modal-body {
    flex-grow: 1;
    height: 100%;

    display: flex;
    flex-direction: column;

    overflow-y: auto;
    gap: 1rem;

    padding: 0px 24px 40px 24px;
    box-sizing: border-box;
    max-height: 80vh;
}

.bottom-modal .modal-body.full {
    flex-grow: 1;
    height: 100%;

    display: flex;
    flex-direction: column;

    overflow-y: auto;
    gap: 1rem;

    padding: 20px;
    box-sizing: border-box;
    max-height: 100vh;
}

.bottom-modal .modal-body .modal-body-container {
    overflow-y: auto;
}

.bottom-modal .modal-body .modal-body-container::-webkit-scrollbar {
    display: none;
}
</style>
