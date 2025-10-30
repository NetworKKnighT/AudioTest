import { twMerge } from 'tailwind-merge';
import { mergeProps } from 'vue';

export const ptViewMerge = (globalPTProps = {} as any, selfPTProps = {} as any, datasets: any) => {
    const { class: globalClass, ...globalRest } = globalPTProps;
    const { class: selfClass, ...selfRest } = selfPTProps;

    return mergeProps({ class: twMerge(globalClass, selfClass) }, globalRest, selfRest, datasets);
    // console.log('params', globalClass, globalRest, selfClass, selfRest, datasets);
    // const result = mergeProps({ class: twMerge(globalClass, selfClass) }, globalRest, selfRest, datasets);
    // console.log('result', result);
    // return result;
};
