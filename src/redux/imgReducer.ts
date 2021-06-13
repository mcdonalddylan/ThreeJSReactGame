export interface IImageState {
    canOverlay: boolean,
    src: string
}

const initialState: IImageState = {
    canOverlay: false,
    src: ''
}

export const imgReducer = (state: IImageState = initialState, action: {type: string, payload: IImageState}) => {

    switch (action.type){
        case 'SET_OVERLAY':
            return {...action.payload};
        default:
            return state;
    }
}