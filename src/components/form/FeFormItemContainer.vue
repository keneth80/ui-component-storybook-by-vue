<template>
    <div class="fe-input-container">
        <div class="fe-form-container">
            <component
                v-bind="props.component.props"
                :is="componentLoaderInit"
                @change="onChangeHandler"
                @validation="onValidationHandler"
            ></component>
        </div>
        <span v-if="isShowValidationMsg && component.props?.validationMessage" class="fe-input-error-msg">{{
            component.props?.validationMessage
        }}</span>
    </div>
</template>

<script lang="ts" setup>
import {ref, computed, defineAsyncComponent} from 'vue';

export interface InputGroupComponentProps {
    inputValue?: string;
    require?: boolean;
    validation?: (value: any) => boolean;
    rule?: string;
    validationMessage?: string;
    order?: number;
    disabled?: boolean;
    maxLength?: number;
}

export interface DynamicFormComponent {
    componentName: 'FeInput';
    props: InputGroupComponentProps;
}

export interface FeFormItemContainerProps {
    component: DynamicFormComponent;
}

export interface InputValidateEvent {
    isValid: boolean;
    targetValue: any;
}

const props = defineProps<FeFormItemContainerProps>();
const emits = defineEmits(['change', 'validation']);

const componentLoader: () => any | null = () => {
    let component: any | null = null;
    switch (props.component.componentName) {
        case 'FeInput':
            component = defineAsyncComponent({
                loader: () => /* @vite-ignore */ import(`@/components/form/FeInput.vue`)
            });
            break;
    }
    return component;
};
const componentLoaderInit = computed(() => componentLoader());

const isShowValidationMsg = ref(false);

const onChangeHandler = (event: any) => {
    console.log('onChangeHandler : ', event);
    emits('change', event);
};

const onValidationHandler = ({isValid, targetValue}: InputValidateEvent) => {
    isShowValidationMsg.value = !isValid;
    console.log('onValidationHandler : ', isValid, targetValue);
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fe-input-container {
    padding: 10px 10px 25px 10px;

    .fe-form-container {
        display: inline-block;
    }

    .fe-input-error-msg {
        display: block;
        color: red;
    }
}
</style>
