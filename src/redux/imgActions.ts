export const setOverlay = (data: {canOverlay: boolean, src: string}) => {
    return {
        type: 'SET_OVERLAY',
        payload: data
    }
}