import json_book from "./../utils/books.json"
import {
    BasketTypes,
    Books,
    GET_BASKET,
    SAVE_BASKET,
} from "../types/Basket/action";

export function getBasket(): BasketTypes {
    return {
        type: GET_BASKET,
        payload: json_book
    }
}

export function saveBasket(books: Array<Books>): BasketTypes {
    console.log(books);
    return {
        type: SAVE_BASKET,
        payload: books
    }
}