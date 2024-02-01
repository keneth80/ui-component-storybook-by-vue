<template>
    <input v-model="textValue" type="text" class="fe-input" @input="onInputChangeHandler" />
</template>

<script lang="ts" setup>
import {ref, toRefs} from 'vue';
import {debounce} from '../../utils/event-utils';
// import {InputComponent} from '../../models';

export interface InputComponentProps {
    inputValue?: string;
    require?: boolean;
    validation?: (value: any) => boolean;
    rule?: string;
    validationMessage?: string;
    order?: number;
    disabled?: boolean;
    maxLength?: number;
}

const props = defineProps<InputComponentProps>();
const emits = defineEmits(['change', 'validation']);

const {inputValue, validation} = toRefs(props);
const textValue = ref(inputValue?.value || '');

const emitInputEvent = debounce((textValue: string) => {
    emits('change', textValue);
    if (validation?.value) {
        const isValid = validation?.value(textValue);
        emits('validation', {isValid, targetValue: textValue});
    }
}, 500);

const onInputChangeHandler = (event: any) => {
    emitInputEvent(event.target?.value);
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fe-input {
    border-color: #ccc;
}
</style>
