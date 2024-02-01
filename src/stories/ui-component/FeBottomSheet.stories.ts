import type {Meta, StoryFn} from '@storybook/vue3';
import {ref} from 'vue';

import FeContainer from '../../components/FeExampleContainer.vue';
import FeButton from '../../components/functions/FeButton.vue';
import FeBottomSheet from '../../components/functions/FeBottomSheet.vue';

const Template = () => ({
    components: {FeBottomSheet, FeButton, FeContainer},
    setup() {
        const isOpen = ref(false);
        return {
            isOpen
        };
    },
    template: `
        <fe-container>
            <div style="display: inline-block">
                <label>모바일 환경에서 확인해주세요.</label><br/>
                <fe-button :label="'Open'" @click="isOpen = !isOpen">{{ isOpen ? 'Close' : 'Open' }}</fe-button>
            </div>
            <div style="display: inline-block">
                <fe-bottom-sheet :status="isOpen" @bottom-sheet-close="isOpen = false">
                    <template #header>
                        <h3>AI코치가 제안하는 연습방법</h3>
                    </template>
                    <template #contents>
                        <div>
                            <h1>Footer 를 정의합니다. 🦶🏻</h1>
                        </div>
                    </template>
                </fe-bottom-sheet>
            </div>
        </fe-container>
    `
});

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof FeBottomSheet> = {
    title: 'UI Component/FeBottomSheet',
    component: FeBottomSheet
};

export default meta;

export const FeBottomSheetBase: StoryFn = Template.bind({});
