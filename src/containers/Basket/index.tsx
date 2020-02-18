import React, {useEffect} from 'react';
import styled from "styled-components";
import {connect, useDispatch, useSelector} from "react-redux";
import {getBasket, removeItem, saveBasket} from "../../actions/MainAction";
import {AddElement} from "../../components/Basket";
import {Books} from "../../types/Basket/action";

import book_image from './../../images/book_image.png';
import minus from './../../images/minus.svg';
import plus from './../../images/plus.svg';
import basket from './../../images/basket.png';

const BasketComponent = () => {
    const dispatch = useDispatch();
    const { books } = useSelector((state: any) => ({
        books: state.basket.books,
    }));

    useEffect(()=>{
        dispatch(getBasket());
    }, []);

    const plusItem = (id: number) => {
        let booksItems = books;

        booksItems.map((item: Books) => {
            if (id === item.id) {
                item.amount++;
            }
        });

        dispatch(saveBasket(booksItems));
    };

    const minusItem = (id: number) => {
        let booksItems = books;

        booksItems.map((item: Books) => {
            if (item.amount >= 1) {
                if (id === item.id) {
                    item.amount--;
                }
            }
        });

        dispatch(saveBasket(booksItems));
    };

    console.log('books: ', books);

    return (
        <BasketWrapper>
            <BookList>
                {books.map((book: Books, key: number)=>
                    book.amount !== 0 && (
                        <BookItem key={key}>
                            <ItemImage>
                                <Image src={book_image}/>
                                <Delete onClick={() => {dispatch(removeItem(book.id))}}>
                                    <IconDelete src={basket}/>
                                </Delete>
                            </ItemImage>
                            <ItemTitle>
                                {book.name}
                            </ItemTitle>
                            <ItemPrice>
                                {book.price} р.
                            </ItemPrice>
                            <ItemControlPanel>
                                <Minus onClick={()=>{minusItem(book.id)}}>
                                    <ImageIcon src={minus}/>
                                </Minus>
                                <Count>{book.amount}</Count>
                                <Plus onClick={()=>{plusItem(book.id)}}>
                                    <ImageIcon src={plus}/>
                                </Plus>
                            </ItemControlPanel>
                        </BookItem>
                    )
                )}
                <AddElement
                    books={books}
                    saveBasket={saveBasket}
                    dispatch={dispatch}
                />
            </BookList>
        </BasketWrapper>
    );
};

const mapStateToProps = (state: any) => ({
    books: state.basket.books
});

export default connect(
    mapStateToProps,
    null
)(BasketComponent);

const BasketWrapper = styled.div`
    
`;

const BookList = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    
    &:after{
        content: "";
        width: calc(100% / 4 - 2rem);
        min-height: 350px;
    }
    
    &:before{
        content: "";
        width: calc(100% / 4 - 2rem);
        order: 9999;
    }
`;

export const Delete = styled.div`
    width: 0;
    height: 0;
    position: absolute;
    right: -20px;
    bottom: -20px;
    border-radius: 50%;
    transition: .6s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    display: flex;
    background: transparent;
    box-shadow: 0 0 24px #8b8b8b;
    cursor: pointer;
`;

export const IconDelete = styled.img`
    width: 30%;
    height: auto;
    position: absolute;
    top: 14px;
    left: 18px;
`;

export const ItemImage = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    margin-top: -50px;
    padding-top: 50px;
    transition: background .6s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    background: linear-gradient(360deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 50%);
    cursor: pointer;
    
    &:hover ${Delete} {
        width: 100px;
        height: 100px;
        right: -50px;
        bottom: -50px;
    }
    
    &:hover {
        background: transparent;
    }
`;

export const Image = styled.img`
    width: 100%;
    border-radius: 4px;
    transition: .2s linear;
    z-index: -1;
`;

export const BookItem = styled.div`
    width: calc(100% / 4 - 2rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 4rem;
    
    @media(max-width: 992px){
        width: calc(100% / 2 - 1rem);
    }
    
    &:hover ${Image} {
        transform: translateY(-16px);
    }
`;

export const ItemTitle = styled.h3`
    width: 100%;
    font-family: "Rubik";
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;

export const ItemPrice = styled.span`
    width: 100%;
    font-family: "Rubik";
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    display: flex;
    justify-content: space-around;
`;

export const ItemControlPanel = styled.div`
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    justify-content: center;
    margin-top: 15px;
`;

export const ImageIcon = styled.img`
    width: 18px;
    opacity: .6;
    transition: .3s linear;
`;

export const Minus = styled.div`
    width: auto;
    padding: 0 12px;
    min-width: 1rem;
    border: 1px solid rgba(0,0,0,.3);
    border-radius: 50% 0 0 50%;
    text-align: center;
    font-size: 32px;
    cursor: pointer;
`;

export const Count = styled.span`
    width: 2rem;
    padding: 4px 10px;
    border-top: 1px solid rgba(0,0,0,.3);
    border-bottom: 1px solid rgba(0,0,0,.3);
    border-left: none;
    border-right: none;
    outline: none;
    font-size: 18px;
    font-family: "Rubik";
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Plus = styled(Minus)`
    border-radius: 0 50% 50% 0;
`;
