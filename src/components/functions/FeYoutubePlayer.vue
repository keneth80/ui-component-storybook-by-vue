<template>
    <div ref="container" class="container"></div>
</template>
<script lang="ts" setup>
import {onMounted, onUpdated, ref, toRefs} from 'vue';
import YTPlayer from 'yt-player';
import YoutubeButton from '../../assets/images/youtube_btn.svg';

interface ILocationQueryString {
    [key: string]: string;
}

interface IYoutubeItem {
    uid: string;
    videoUrl: string;
    thumbnailImageUrl: string;
    viewContainerClassName?: string;
}

const props = defineProps<IYoutubeItem>();

const {uid, videoUrl, thumbnailImageUrl, viewContainerClassName} = toRefs(props);
const videoId = ref();
const container = ref();

const setLazyElement = (imageElement: any, className: string) => {
    const observerOption = {
        root: className ? document.querySelector(`.${className}`) : null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.1
    };
    const imageIo = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('src', thumbnailImageUrl.value);
                observer.unobserve(entry.target);
            }
        });
    }, observerOption);
    imageIo.observe(imageElement);
};

const createElement = () => {
    const divisionElement = document.createElement('div');
    const thumbnailImageElement = document.createElement('img');
    const youtubeButtonElement = document.createElement('img');

    divisionElement.setAttribute('class', 'youtube-container');
    divisionElement.setAttribute('id', `youtube-${uid.value}`);
    divisionElement.addEventListener('click', () => playYoutube(true));

    setLazyElement(thumbnailImageElement, viewContainerClassName?.value || '');
    thumbnailImageElement.addEventListener('error', () => playYoutube(false));

    youtubeButtonElement.setAttribute('class', 'play-button');
    youtubeButtonElement.setAttribute('src', YoutubeButton);

    divisionElement.appendChild(thumbnailImageElement);
    divisionElement.appendChild(youtubeButtonElement);

    document.querySelector('.youtube-container')?.remove();
    container.value.appendChild(divisionElement);
};

const playYoutube = (isAutoPlay: boolean) => {
    const player = new YTPlayer(`#youtube-${uid.value}`, {
        width: document.documentElement.scrollWidth,
        playsInline: true,
        controls: true
    });
    if (videoUrl.value.includes('https://youtu.be/')) {
        videoId.value = videoUrl.value.replace('https://youtu.be/', '');
    } else if (videoUrl.value.includes('https://www.youtube.com/embed/')) {
        videoId.value = videoUrl.value.replace('https://www.youtube.com/embed/', '');
    } else {
        videoId.value = useUrlQuery(['v'], videoUrl.value).v;
    }
    player.setSize(document.documentElement.scrollWidth, 210);
    player.load(videoId.value, isAutoPlay);
    player.mute();
    // player.play();
    player.on('unstarted', () => {
        // player.play();
        // console.log(player.getDuration()); // => 351.521
    });
};

const useUrlQuery = (keys: Array<string> = [], url: string): ILocationQueryString => {
    const myUrl = new URL(url.replace(/#/g, ''));
    const urlSearchParams = new URLSearchParams(myUrl.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (keys.length === 0) {
        return params;
    }
    const result: ILocationQueryString = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        result[key] = params[key];
    }
    return result;
};

onMounted(() => {
    createElement();
});

onUpdated(() => {
    createElement();
});
</script>
<style lang="scss" scoped>
.container:deep() {
    display: flex;
    width: 100%;

    .youtube-container {
        position: relative;
        width: 100%;
        min-height: 190px;
        img {
            width: 100%;
        }
        .play-button {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 68px;
            height: 48px;
            margin-left: -34px;
            margin-top: -24px;
            -webkit-transition: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);
            -o-transition: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);
            transition: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);
            z-index: 63;
        }
    }
}
</style>
