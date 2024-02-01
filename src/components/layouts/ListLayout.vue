<template>
    <div class="list-container">
        <div>item1 {{ isDriving }}</div>
        <div>item2 {{ isDriving }}</div>
        <div>item3 {{ isDriving }}</div>
        <div class="canvas-container">
            <svg id="objectCanvas" class="canvas" preserveAspectRatio="none"></svg>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
// import {getDriving} from 'fe-data-api/gdr-api';
// import {ObjectDrawing} from 'fe-data-visualization';

// const temp = {
//     data: [
//         {
//             id: '8106e75d-585e-2623-c780-c025f3de42e8',
//             name: '011cbfef-38d4-7db2-def0-94963f6af5b5-name',
//             description: '1',
//             geometryModel: {
//                 width: 43,
//                 height: 80,
//                 x: 55,
//                 y: 89
//             }
//         },
//         {
//             id: '9de3679d-cf44-f80f-88c3-a2ff7c29d982',
//             name: '32108325-fcf2-a3b2-36cb-aa5e9153e148-name',
//             description: '2',
//             geometryModel: {
//                 width: 80,
//                 height: 47,
//                 x: 250,
//                 y: 262
//             }
//         },
//         {
//             id: '83c2d825-3ec8-8273-66e4-1e2b890f8b14',
//             name: '294d589a-da0e-705e-4d06-76cee9fff74f-name',
//             description: '3',
//             geometryModel: {
//                 width: 42,
//                 height: 78,
//                 x: 7,
//                 y: 216
//             }
//         },
//         {
//             id: '5a0e85a0-800d-f81e-de04-49f318cfa5a1',
//             name: '36bdd5c6-1cff-6a43-fd47-52d2f27cf044-name',
//             description: '4',
//             geometryModel: {
//                 width: 77,
//                 height: 44,
//                 x: 252,
//                 y: 409
//             }
//         },
//         {
//             id: '0967651f-f9c1-6a80-ee4b-52bcddc13ce6',
//             name: 'a744c65f-4d14-5cad-a86b-5a95bae1654e-name',
//             description: '5',
//             geometryModel: {
//                 width: 79,
//                 height: 45,
//                 x: 9,
//                 y: 314
//             }
//         }
//     ]
// };

export default defineComponent({
    name: 'ListLayout',
    props: {
        value: String
    },
    setup(props: any, context: any) {
        const isDriving = ref(false);

        console.log('ListLayout : ', props, context);

        // getDriving().then((result: any) => {
        //     console.log('getDriving : ', result);
        //     isDriving.value = result;

        //     const objectDrawing = new ObjectDrawing({
        //         selector: '#objectCanvas',
        //         data: temp.data
        //     });

        //     console.log('objectDrawing : ', objectDrawing);
        // });

        return {
            isDriving
        };
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-container {
    margin: auto;
}
.canvas-container {
    width: 400px;
    height: 700px;
    text-align: center;
    margin: auto;
}

.canvas-container > .canvas {
    width: 100%;
    height: 100%;
    background-color: #dfdddd;
    display: block;
}
</style>
