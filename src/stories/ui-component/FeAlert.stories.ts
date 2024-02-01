import type {Meta, StoryFn} from '@storybook/vue3';
import {ref} from 'vue';

import FeContainer from '../../components/FeExampleContainer.vue';
import FeButton from '../../components/functions/FeButton.vue';
import FeAlert from '../../components/functions/FeAlert.vue';

const Template = () => ({
    components: {FeAlert, FeButton, FeContainer},
    setup() {
        const isOpen = ref(false);
        return {
            isOpen
        };
    },
    template: `
        <fe-container>
            <div style="display: inline-block">
                <fe-button :label="'Open'" @click="isOpen = true">Open</fe-button>
            </div>
            <div style="display: inline-block">
                <fe-alert v-if="isOpen" @close-alert="isOpen = false">
                    <template #btns>
                        <fe-button @click="isOpen = false">OK</fe-button>
                        <fe-button @click="isOpen = false">Close</fe-button>
                    </template>
                </fe-alert>
            </div>
        </fe-container>
    `
});

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof FeAlert> = {
    title: 'UI Component/FeAlert',
    component: FeAlert
};

export default meta;

export const FeAlertBase: StoryFn = Template.bind({});
