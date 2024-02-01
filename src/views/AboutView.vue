<template>
    <div class="about">
        <h1>This is an about page</h1>
        <FeButton :label="'Click'" />
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import FeButton from '../components/functions/FeButton.vue';

export default defineComponent({
    name: 'AboutView',
    components: {
        FeButton
    }
});
</script>
