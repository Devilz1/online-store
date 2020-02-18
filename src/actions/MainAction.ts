import json_book from "./../utils/books.json"
import {BasketTypes, Books, GET_BASKET, REMOVE_ITEM_BASKET, SAVE_BASKET} from "../types/Basket/action";
import {Dispatch} from "redux";
import _ from "underscore";

export function getBasket(): BasketTypes {
    return {
        type: GET_BASKET,
        payload: json_book
    }
}

export function saveBasket(books: Array<Books>): BasketTypes {
    return {
        type: SAVE_BASKET,
        payload: books
    }
}

export const removeItem = (id: number) => {
    return (dispatch: Dispatch, getState: any) => {
        let booksItem = getState().basket.books;

        dispatch({
            type: REMOVE_ITEM_BASKET,
            payload: _.filter(booksItem, (item:any) => { return item.id !== id })
        });
    }
};