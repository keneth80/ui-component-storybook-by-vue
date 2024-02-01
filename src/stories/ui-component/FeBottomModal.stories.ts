import type {Meta, StoryFn} from '@storybook/vue3';
import {ref} from 'vue';

import FeContainer from '../../components/FeExampleContainer.vue';
import FeButton from '../../components/functions/FeButton.vue';
import FeBottomModal from '../../components/functions/FeBottomModal.vue';

const Template = () => ({
    components: {FeBottomModal, FeButton, FeContainer},
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
                <fe-bottom-modal :status="isOpen" :is-full="false" @bottom-modal-close="isOpen = false">
                    <template #contents>
                        <div style="width: 100%; height: 100px">
                            <span>Content</span>
                        </div>
                    </template>
                </fe-bottom-modal>
            </div>
        </fe-container>
    `
});

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof FeBottomModal> = {
    title: 'UI Component/FeBottomModal',
    component: FeBottomModal
};

export default meta;

export const FeBottomModalBase: StoryFn = Template.bind({});
