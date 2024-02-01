<template lang="">
    <div>
        <transition name="alert">
            <div class="alert-mask">
                <div class="alert-container">
                    <div class="alert-body">
                        <slot name="body"> default body </slot>
                    </div>
                    <div class="alert-btns">
                        <slot name="btns">
                            <button class="alert-default-button" @click="cloaeAlert()">default확인</button>
                        </slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import {defineComponent, SetupContext} from 'vue';

export default defineComponent({
    name: 'FeAlert',
    setup(props, context: SetupContext) {
        const cloaeAlert = () => {
            context.emit('confirm-alert', false);
        };

        return {
            cloaeAlert
        };
    }
});
</script>
<style lang="scss" scoped>
.alert-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: opacity 0.3s ease;
}
.alert-container {
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: sans-serif;
}

.alert-body {
    padding: 20px 0;
}

.alert-btns {
    display: flex;
    justify-content: center;
    gap: 5px;
    & .alert-default-button {
        padding: 3px 5px;
    }
}

.alert-enter {
    opacity: 0;
}

.alert-leave-active {
    opacity: 0;
}

.alert-enter .alert-container,
.alert-leave-active .alert-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
