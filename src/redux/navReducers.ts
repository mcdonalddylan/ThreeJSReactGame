import { SET_QUALITY } from "./navActions";

export const qualityReducer = (state: number = 1, action: any) => {

    switch(action.type){
        case SET_QUALITY:
            return action.payload;
        default:
            return state;
    }
}