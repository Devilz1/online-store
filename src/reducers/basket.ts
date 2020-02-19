import {
    GET_BASKET,
    SAVE_BASKET,
    BasketTypes, REMOVE_ITEM_BASKET,
} from "../types/Basket/action";
import {BasketInitialState} from "../types/Basket/reducer";

export const initialState: BasketInitialState = {
    books: [],
    allSum: 0
};

export function basketReducer(state: BasketInitialState = initialState, action: BasketTypes): BasketInitialState {
    switch (action.type) {
        case GET_BASKET:
            return {
                ...state,
                books: action.payload,
            };
        case SAVE_BASKET:
            return {
                ...state,
                books: action.payload,
            };
        case REMOVE_ITEM_BASKET:
            return {
                ...state,
                books: action.payload,
            };
        default:
            return state
    }
}