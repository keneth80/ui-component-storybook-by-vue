import type {Meta, StoryFn} from '@storybook/vue3';
import {ref} from 'vue';

import FeContainer from '../../components/FeExampleContainer.vue';
import FeButton from '../../components/functions/FeButton.vue';
import FeLayerModal from '../../components/functions/FeLayerModal.vue';

const Template = () => ({
    components: {FeLayerModal, FeButton, FeContainer},
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
                <fe-layer-modal :status="isOpen" @layer-modal-close="isOpen = false">
                    <template #contents>
                        <div style="width: 100%; height: 100px">
                            <span>Content</span>
                        </div>
                    </template>
                </fe-layer-modal>
            </div>
        </fe-container>
    `
});

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof FeLayerModal> = {
    title: 'UI Component/FeLayerModal',
    component: FeLayerModal
};

export default meta;

export const FeLayerModalBase: StoryFn = Template.bind({});
