export const SET_QUALITY = 'SET_QUALITY';

export const setQuality = (data:number) => {
    return {
        type: SET_QUALITY,
        payload: data
    };
}