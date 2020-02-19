import json_book from "./../utils/books.json"
import {BasketTypes, Books, GET_BASKET, REMOVE_ITEM_BASKET, SAVE_BASKET} from "../types/Basket/action";
import {FormDataBook} from "../components/Basket/AddElement";
import {Dispatch} from "redux";
import _ from "underscore";

export const getBasket = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: GET_BASKET,
            payload: json_book.reverse()
        } as BasketTypes)
    }
};

export const saveBasket = (book: FormDataBook) => {
    return (dispatch: Dispatch, getState: any) => {
        let booksItem = getState().basket.books;
        book.id = booksItem[0].id + 1;

        booksItem.unshift(book);

        dispatch({
            type: SAVE_BASKET,
            payload: booksItem
        } as BasketTypes)
    }
};

export const removeItem = (id: number) => {
    return (dispatch: Dispatch, getState: any) => {
        let booksItem = getState().basket.books;

        dispatch({
            type: REMOVE_ITEM_BASKET,
            payload: _.filter(booksItem, (item:any) => { return item.id !== id })
        } as BasketTypes);
    }
};

export const plusMinusItem = (id: number, mathOperation: string) => {
    return (dispatch: Dispatch, getState: any) => {
        let booksItem = getState().basket.books;

        _.map(booksItem, (item: Books) => {
            if (item.amount >= 1) {
                if (id === item.id) {
                    return mathOperation === "-" ? item.amount-- : item.amount++;
                }
            }
        });

        dispatch({
            type: SAVE_BASKET,
            payload: booksItem
        })
    }
};