interface IGlobals {
    [key: string]: any;
}

const globals: IGlobals = {};

export const useGlobalValue = (): [() => IGlobals, (value: IGlobals) => void] => {
    const setValue = (value: IGlobals) => {
        Object.assign(globals, value);
    };

    const getValue = () => {
        return globals;
    };
    return [getValue, setValue];
};
