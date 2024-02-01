<template>
    <div class="form">
        <h1>This is an Form Component</h1>
        <div>
            <fe-input :input-value="inputValue" @change="onChangeInput" />
        </div>
        <div>
            <fe-form-item-container :component="formOption" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import FeInput from '../components/form/FeInput.vue';
import FeFormItemContainer from '../components/form/FeFormItemContainer.vue';

const inputValue = ref('Test Input');
const inputFormValue = ref('Test Form Input');
const inputFormValidationMsg = ref('20자가 넘었어요');
const inputValidation = (value: string) => {
    if (value.length > 20) {
        return false;
    }

    return true;
};
const formOption = ref<any>({
    componentName: 'FeInput',
    props: {
        inputValue: inputFormValue.value,
        validationMessage: inputFormValidationMsg.value,
        validation: inputValidation
    }
});

const onChangeInput = (event: string) => {
    console.log('onChangeInput : ', event);
    inputValue.value = event;
};

const onFormChangeInput = (event: string) => {
    console.log('onFormChangeInput : ', event);
    inputFormValue.value = event;
};

const onValidationFormInput = (event: any) => {
    console.log('onValidationFormInput : ', event);
};
</script>
