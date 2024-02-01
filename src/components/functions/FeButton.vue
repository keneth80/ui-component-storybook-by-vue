<template>
    <button type="button" :class="classes" :style="style" @click="onClick">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import {computed} from 'vue';

interface IFeButtonProps {
    primary?: boolean;
    size?: 'small' | 'medium' | 'large';
    backgroundColor?: string;
}

const props = withDefaults(defineProps<IFeButtonProps>(), {primary: false});

const emit = defineEmits<{
    (e: 'click', id: number): void;
}>();

const classes = computed(() => ({
    'fe-button': true,
    'fe-button--primary': props.primary,
    'fe-button--secondary': !props.primary,
    [`fe-button--${props.size || 'medium'}`]: true
}));

const style = computed(() => ({
    backgroundColor: props.backgroundColor
}));

const onClick = () => {
    emit('click', 1);
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fe-button {
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
    border: 0;
    border-radius: 3em;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
}
.fe-button--primary {
    color: white;
    background-color: #1ea7fd;
}
.fe-button--secondary {
    color: #333;
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}
.fe-button--small {
    font-size: 12px;
    padding: 10px 16px;
}
.fe-button--medium {
    font-size: 14px;
    padding: 11px 20px;
}
.fe-button--large {
    font-size: 16px;
    padding: 12px 24px;
}
</style>
