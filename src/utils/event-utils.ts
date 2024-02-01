export const debounce = (callback: any, delayTime = 0) => {
    let timeout: any = null;
    return (...args: any[]) => {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            // 지정된 함수 실행
            callback(...args);
            // 함수 실행 후 settimeout clear
            clearTimeout(timeout);
        }, delayTime);
    };
};
