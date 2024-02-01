import {type Meta, type StoryFn} from '@storybook/vue3';
import {action} from '@storybook/addon-actions';
import {withDesign} from 'storybook-addon-designs';
import {useGlobalValue} from '../utils';

import FeContainer from '../../components/FeExampleContainer.vue';
import FeButton from '../../components/functions/FeButton.vue';

const Template = () => ({
    components: {FeButton, FeContainer},
    setup(props: any, context: any) {
        const [globalValue] = useGlobalValue();
        const backgroundColor = globalValue().theme;
        const buttonAction = action('clicked');
        console.log('FeButton.Template : ', globalValue(), props, context);
        return {
            backgroundColor,
            buttonAction
        };
    },
    template: `
        <fe-container>
            <div style="display: inline-block">
                <fe-button :backgroundColor="backgroundColor" :primary="true">Button</fe-button>
            </div>
            <div style="display: inline-block">
                <fe-button :backgroundColor="backgroundColor" :primary="true" @click="buttonAction">Action</fe-button>
            </div>
            <div style="display: inline-block">
                <fe-button :primary="false">Button</fe-button>
            </div>
            <div style="display: inline-block">
                <fe-button :size="'large'">Button</fe-button>
            </div>
            <div style="display: inline-block">
                <fe-button :size="'small'">Button</fe-button>
            </div>
            <div style="display: inline-block">
                <fe-button :primary="false">😀 😎 👍 💯</fe-button>
            </div>
        </fe-container>
    `
});

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof FeButton> = {
    title: 'UI Component/FeButton',
    decorators: [withDesign],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File'
        }
    },
    component: FeButton
};

export default meta;

export const FeButtonBase: StoryFn = Template.bind({});
