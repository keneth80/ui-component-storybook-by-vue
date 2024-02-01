// .storybook/preview.js
import {app} from '@storybook/vue3';
import {useGlobals} from '@storybook/client-api';
import {useGlobalValue} from '../../src/stories/utils';

/* import the fontawesome core */
import '@fortawesome/fontawesome-free/css/all.css';
import {library} from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

/* add icons to the library */

library.add(fas, fab, far);
app.component('FontAwesomeIcon', FontAwesomeIcon);

console.log('env : ', process.env.STORYBOOK_CHALLY_THEME);

export const globalTypes = {
    theme: {
        name: 'Theme Color',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            title: 'Theme Color',
            icon: 'globe',
            // Array of plain string values or MenuItem shape (see below)
            items: [
                {title: 'Normal', value: '#1ea7fd'},
                {title: 'Chally', value: '#BCFF2E'}
            ],
            // Property that specifies if the name of the item will be displayed
            showName: true,
            // Change title based on selected value
            dynamicTitle: true
        }
    }
};

export const decorators = [
    (story, context) => {
        const [globals] = useGlobals();
        const [value, setValue] = useGlobalValue();
        setValue(globals);
        console.log('decorators : ', value(), story, context);

        const wrapped = story(context);
        return {
            components: {wrapped},
            template: '<div style="width: 100%; height: 100%; text-align: center; margin: 10px;"><wrapped /></div>'
        };
    }
];

export default {
    decorators
};
