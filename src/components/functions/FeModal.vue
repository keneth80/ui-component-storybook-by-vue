<template lang="">
    <div>
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <slot name="header"> default header </slot>
                        </div>

                        <div class="modal-body">
                            <slot name="body"> default body </slot>
                        </div>
                        <div class="modal-footer">
                            <slot name="footer"></slot>
                        </div>
                        <div class="modal-btns">
                            <slot name="btns">
                                <button class="modal-default-button" @click="confirmModal()">default확인</button>
                                <button class="modal-default-button" @click="closeModal()">default닫기</button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import {defineComponent, SetupContext} from 'vue';

export default defineComponent({
    name: 'FeModal',
    setup(props, context: SetupContext) {
        const closeModal = () => {
            console.log('close-modal');
            context.emit('close-modal', false);
        };

        const confirmModal = () => {
            console.log('confirm-modal');
            context.emit('confirm-modal', false);
        };

        return {
            closeModal,
            confirmModal
        };
    }
});
</script>
<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(175, 175, 175, 0.3);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: sans-serif;

    & > div {
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
}
.modal-body {
    padding: 20px 0;
}

.modal-btns {
    display: flex;
    justify-content: center;
    gap: 5px;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
