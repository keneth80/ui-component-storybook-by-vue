<template>
    <div class="video-container">
        <div class="video-play" v-if="!isPlay">
            <button class="video-play-btn"></button>
            <div class="video-play-info">
                <span class="into-text">{{ clubType }}</span>
                <div class="info-circle-divider"></div>
                <span class="into-text">{{ distanceValue }}{{ unitValue }}</span>
            </div>
        </div>
        <button class="video-playbackrate" @click="changepPlaybackreate()">
            <span>{{ rateText }}</span>
        </button>

        <video class="video">
            <source :src="srcUrl" :type="srcType" />
        </video>

        <div class="controls">
            <div class="progress">
                <div class="progress__filled"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {onMounted, SetupContext, ref, defineComponent} from 'vue';
const PLAYBACK_RATE = [1, 0.5, 0.25, 0.125];
const PLAYBACK_RATE_TEXT = ['1 x', '1/2 x', '1/4 x', '1/8 x'];

interface IVideoViewerProps {
    sourceUrl: string;
    sourceType?: string;
    club?: string;
    distance?: number;
    unit?: string;
}

export default defineComponent({
    props: {
        sourceUrl: {
            type: String,
            required: true
        },
        sourceType: {
            type: String,
            required: false
        },
        club: {
            type: String,
            required: false
        },
        distance: {
            type: Number,
            required: false
        },
        unit: {
            type: String,
            required: false
        }
    },
    setup(props: Readonly<IVideoViewerProps>, {emit}: SetupContext) {
        const srcUrl = ref(props.sourceUrl);
        const srcType = ref(props.sourceType || 'video/mp4');
        const clubType = ref(props.club);
        const distanceValue = ref(props.distance);
        const unitValue = ref(props.unit);

        const isPlay = ref(false);
        const video = ref();
        const rateIndex = ref(0);
        const rateText = ref(PLAYBACK_RATE_TEXT[0]);

        const changepPlaybackreate = () => {
            rateIndex.value++;

            if (rateIndex.value >= PLAYBACK_RATE.length) {
                rateIndex.value = 0;
            }

            video.value.playbackRate = PLAYBACK_RATE[rateIndex.value];
            rateText.value = PLAYBACK_RATE_TEXT[rateIndex.value];
        };

        const initVideoEvent = () => {
            const container = document.querySelector('.video-container');
            if (!container) return;
            video.value = container.querySelector('.video');
            const progress: HTMLElement | null = container.querySelector('.progress');
            const progressBar: HTMLElement | null = container.querySelector('.progress__filled');
            const clickEventName = (function () {
                if ('ontouchstart' in document.documentElement === true) {
                    return 'touchstart';
                } else {
                    return 'click';
                }
            })();

            const togglePlay = () => {
                if (!video.value) return;
                let method;
                if (video.value.paused) {
                    isPlay.value = true;
                    method = 'play';
                } else {
                    isPlay.value = false;
                    method = 'pause';
                }
                video.value.muted = true;
                video.value[method]();
                setTimeout(() => {
                    video.value.muted = false;
                });
            };

            const handleProgress = () => {
                if (!video.value) return;
                const percent = (video.value.currentTime / video.value.duration) * 100;
                if (progressBar) {
                    progressBar.style.width = `${percent}%`;
                }
            };
            const scrub = (e: TouchEvent | MouseEvent) => {
                if (clickEventName === 'touchstart') {
                    scrubByTouch(e as TouchEvent);
                } else {
                    scrubByMouse(e as MouseEvent);
                }
            };

            const scrubByMouse = (e: MouseEvent) => {
                if (!video.value) return;
                const scrubTime = (e.offsetX / (progress?.offsetWidth || 0)) * video.value.duration;
                video.value.currentTime = scrubTime;
            };

            const scrubByTouch = (e: TouchEvent) => {
                if (!video.value) return;
                const offset = recoverOffsetValues(e);
                const scrubTime = (offset[0] / (progress?.offsetWidth || 0)) * video.value.duration;
                video.value.currentTime = scrubTime;
            };

            function recoverOffsetValues(e: TouchEvent) {
                var rect = (e.target as HTMLElement).getBoundingClientRect();
                var bodyRect = document.body.getBoundingClientRect();
                var x = e.changedTouches[0].clientX - (rect.left - bodyRect.left);
                var y = e.changedTouches[0].clientY - (rect.top - bodyRect.top);
                return [x, y];
            }

            const setTime = () => {
                handleProgress();
                emit('update-time', video.value.currentTime);
            };

            if (video.value) {
                video.value.addEventListener(clickEventName, togglePlay);
                video.value.addEventListener('timeupdate', setTime);
                video.value.addEventListener('ended', () => {
                    isPlay.value = false;
                });
            }

            let mousedown = false;
            progress?.addEventListener(clickEventName, scrub);

            window.addEventListener('mousemove', (e: MouseEvent) => {
                mousedown && scrub(e);
            });
            window.addEventListener('touchmove', (e: TouchEvent) => {
                mousedown && scrubByTouch(e);
            });

            progress?.addEventListener('mousedown', () => {
                mousedown = true;
                if (video.value) {
                    video.value.pause();
                }
            });
            progress?.addEventListener('touchstart', () => {
                mousedown = true;
                if (video.value) {
                    video.value.pause();
                }
            });

            window.addEventListener('mouseup', () => {
                mousedown = false;
            });
            window.addEventListener('touchend', () => {
                mousedown = false;
            });
        };

        onMounted(() => {
            initVideoEvent();
        });

        return {
            srcUrl,
            srcType,
            clubType,
            distanceValue,
            unitValue,
            isPlay,
            video,
            rateIndex,
            rateText,
            changepPlaybackreate,
            initVideoEvent
        };
    }
});
</script>
<style lang="scss" scoped>
.video-container {
    width: 100%;
    position: relative;

    & .video-play {
        text-align: center;
        display: block;
        left: calc(50%);
        transform: translate(-50%, -50%);
        position: absolute;
        top: 50%;

        & .video-play-btn {
            width: 54px;
            height: 54px;
            background: url(http://i.gzcdn.net/images/v3/newgdr/svg/ico_pract_play.svg) no-repeat;
            -webkit-background-size: 54px 54px;
            -moz-background-size: 54px 54px;
            background-size: 54px 54px;
        }

        & .video-play-info {
            display: flex;
            align-items: center;
            gap: 8px;
            & .info-circle-divider {
                width: 3.9px;
                height: 3.9px;
                color: white;
                background-color: white;
                border-radius: 50%;
            }
            & .into-text {
                font-size: 30px;
                font-weight: bold;
                color: white;
            }
        }
    }

    & .video-playbackrate {
        z-index: 1;
        position: absolute;
        width: 59px;
        height: 32px;
        bottom: 0px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.6);
        right: 15px;
        bottom: 21px;
        padding: 0;
        padding-bottom: 2px;

        & span {
            color: white;
            opacity: 1;
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: normal;
        }
    }

    & .video {
        width: 100%;
    }

    & .controls {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.1);

        & .progress {
            position: relative;
            width: 100%;
            height: 6px;
            transition: height 0.3s;
            background: #ccc;
            cursor: ew-resize;

            & .progress__filled {
                background: #1e1e1f;
                position: absolute;
                width: 0;
                top: 0;
                left: 0;
                height: 6px;

                &:hover::before {
                    width: 18px;
                    height: 18px;
                }

                &::before {
                    content: '';
                    display: block;
                    right: 0;
                    top: 50%;
                    height: 14px;
                    width: 14px;
                    position: absolute;
                    border-radius: 50%;
                    background: #1e1e1f;
                    transform: translateY(-50%);
                }
            }
        }
    }
}
</style>
