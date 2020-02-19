import {Books} from "./action";

export interface BasketInitialState {
    books: Array<Books> | Array<any>,
    allSum: number
}