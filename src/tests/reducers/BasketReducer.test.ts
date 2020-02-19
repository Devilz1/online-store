import {saveBasket, removeItem} from "./../../actions/BasketAction";
import sinon from "sinon";


describe("Testing action saveBasket", () => {
    const dispatch = sinon.stub();
    const getState = sinon.stub().returns({
        basket: {
            books: [
                {
                    id: 199998,
                    name: "Тестовая книга 1",
                    price: 1500,
                    amount: 4,
                },
                {
                    id: 199999,
                    name: "Тестовая книга 2",
                    price: 1500,
                    amount: 4,
                },
            ]
        }
    });

    let saveBasketAction = saveBasket({
        id: 200000,
        name: "Тестовая книга 3",
        price: 1200,
        amount: 2,
    });

    beforeEach(() => {
        saveBasketAction(dispatch, getState)
    });

    it('Testing action saveBasket', function () {
        expect(getState.calledOnce).toBe(true);
    });
});

describe("Testing action removeItem", () => {
    const dispatch = sinon.stub();
    const getState = sinon.stub().returns({
        basket: {
            books: [
                {
                    id: 200000,
                    name: "Тестовая книга 1",
                    price: 1500,
                    amount: 4,
                },
                {
                    id: 199999,
                    name: "Тестовая книга 2",
                    price: 1500,
                    amount: 4,
                },
            ]
        }
    });

    let saveBasketAction = removeItem(200000);

    beforeEach(() => {
        saveBasketAction(dispatch, getState)
    });

    it('Testing action saveBasket', function () {
        expect(getState.calledOnce).toBe(true);
    });
});