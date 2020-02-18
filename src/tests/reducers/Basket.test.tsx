import React from "react";
import {basketReducer} from "../../reducers/basket";
import {saveBasket} from "../../actions/MainAction";
import { render } from '@testing-library/react';
import {AddElement} from "../../components/Basket";
import {useDispatch} from "react-redux";

test('Receipt of goods in the basket`s', () => {
    let action = saveBasket([
        {
            "id": 145880,
            "name": "Новая книга для тестирования",
            "price": 1000,
            "amount": 2
        }
    ]);

    let state = {
        books: [],
        allSum: 0
    };

    let newState = basketReducer(state, action);

    expect(newState.books.length).toBe(1);
});

test('Component "AddElement"', () => {
    test('renders learn react link', () => {
        let dispatch = useDispatch();

        let books = [
            {
                "id": 111111,
                "name": "Новая книга для тестирования",
                "price": 1000,
                "amount": 2
            }
        ];

        const { getByText } = render(
            <AddElement
                books={books}
                saveBasket={saveBasket}
                dispatch={dispatch}
            />
        );
        const linkElement = getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    });
});
