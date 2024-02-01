import {createApp, App as Application} from 'vue';
import Root from './App.vue';
import router from './router';

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

const app: Application = createApp(Root);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
