export const GET_BASKET = 'GET_BASKET';
export const SAVE_BASKET = 'SAVE_BASKET';
export const REMOVE_ITEM_BASKET = 'REMOVE_ITEM_BASKET';

export interface Books {
    id: number,
    name: string | undefined,
    price: number | undefined,
    amount: number
}

interface GetBasket {
    type: typeof GET_BASKET
    payload: Array<Books>
}

interface SaveBasket {
    type: typeof SAVE_BASKET
    payload: Array<Books>
}

interface RemoveItemBasket {
    type: typeof REMOVE_ITEM_BASKET
    payload: Array<Books>
}

export type BasketTypes = GetBasket | SaveBasket | RemoveItemBasket