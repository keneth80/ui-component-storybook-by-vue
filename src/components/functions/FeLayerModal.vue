<template>
    <div class="layer-modal-root font-system column fill items-center justify-center">
        <div :aria-hidden="!status" class="layer-modal" role="dialog">
            <!-- modal dim 처리 -->
            <div class="overlay" @click="closeModal()"></div>
            <div class="contents">
                <header class="controls">
                    <button v-if="showCloseBtn" class="layer-modal-button close-modal" type="button" @click="closeModal()">
                        <img :src="xIcon" alt="" />
                    </button>
                </header>

                <main class="modal-body" :style="styleObject">
                    <slot name="contents"></slot>
                </main>

                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent, SetupContext} from 'vue';
import {xIcon} from '../../components-icon';
export default defineComponent({
    props: {
        status: {
            type: Boolean,
            required: true,
            default: false
        },
        contentsMaxHeight: {
            type: Number,
            required: false,
            default: 90
        },
        contentsPadding: {
            type: Number,
            required: false,
            default: NaN
        },
        showCloseBtn: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    setup(props: Readonly<{status: boolean; contentsMaxHeight: number; contentsPadding: number; showCloseBtn: boolean}>, {emit}: SetupContext) {
        console.log(props.showCloseBtn);
        const closeModal = () => {
            emit('layer-modal-close', false);
        };

        const styleObject =
            props.contentsMaxHeight > 0
                ? {
                      'max-height': `${props.contentsMaxHeight}vh`
                  }
                : {};
        if (props.contentsPadding) {
            Object.assign(styleObject, {
                padding: `${props.contentsPadding}px`
            });
        }
        return {
            closeModal,
            xIcon,
            styleObject
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
    --layer-modal-background: #fff;
    --layer-modal-foreground: #000;
    --layer-modal-divider: #dcdcdc;
    --layer-modal-overlay: #888;
}

.layer-modal-root {
    background: #fff;
    color: #000;

    overflow: hidden;
    line-height: 1.5;

    -webkit-tap-highlight-color: transparent;
}

.layer-modal-button,
.layer-modal-input,
.layer-modal-textarea,
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

.layer-modal-textarea {
    resize: none;
}

.layer-modal-button {
    cursor: pointer;
}

.layer-modal {
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
    z-index: 999999;
}

.layer-modal[aria-hidden='true'] {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.layer-modal .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: #888;
    opacity: 0.5;
}

.layer-modal .contents {
    position: absolute;
    width: 90%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;

    top: 50%;

    border-radius: 18px;

    background: #fff;

    overflow-y: hidden;

    transition: transform 0.5s, border-radius 0.5s;
    transform: translateY(-50%);

    max-width: 70rem;
    max-height: 100vh;

    min-height: 200px;

    box-sizing: border-box;
}

.layer-modal .contents:not(.not-selectable) {
    transition: transform 0.5s, border-radius 0.5s, height 0.5s;
}

.layer-modal .contents.fullscreen {
    border-radius: 0;
}

.layer-modal[aria-hidden='true'] .contents {
    transform: translateY(100%);
}

.controls {
    justify-content: end;
}
.modal-btns {
    display: flex;
    justify-content: center;
    gap: 5px;
}

.layer-modal .controls {
    display: flex;
    flex-direction: column;
    height: 40px;
}

.layer-modal .close-modal {
    border: none;
    text-align: right;
    padding: 0;
}

.layer-modal .close-modal img {
    width: 17px;
    height: 17px;
    margin-right: 20px;
}

.layer-modal .modal-body {
    flex-grow: 1;
    max-height: 80%;

    display: flex;
    flex-direction: column;

    overflow-y: auto;
    gap: 1rem;

    padding: 20px;
    box-sizing: border-box;
}
</style>
