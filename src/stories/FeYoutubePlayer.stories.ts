import {Meta, StoryFn} from '@storybook/vue3';
import FeContainer from '../components/FeExampleContainer.vue';
import FeYoutubePlayer from '../components/functions/FeYoutubePlayer.vue';

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'External Library/FeYoutubePlayer',
    component: FeYoutubePlayer
} as Meta<typeof FeYoutubePlayer>;

//👇 We create a “template” of how args map to rendering
const Template: StoryFn<any> = (args) => ({
    components: {FeYoutubePlayer, FeContainer},
    setup() {
        return {args};
    },
    template: `
        <fe-container>
            <div style="display: inline-block; width: 100%; height: 100%; max-width: 320px; max-height: 210px">
                <fe-youtube-player v-bind="args" />
            </div>
        </fe-container>
    `
});

//👇 Each story then reuses that template
export const FeYoutubePlayerBase = Template.bind({});

const tempItems = {
    uid: '66',
    videoUrl: 'https://youtu.be/4lfesvt2HIk',
    thumbnailImageUrl: 'https://media-america.goalfers.com/drill/chally_066_thumb(en).jpg',
    viewContainerClassName: ''
};
FeYoutubePlayerBase.args = tempItems;
