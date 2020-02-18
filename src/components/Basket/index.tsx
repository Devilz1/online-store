import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import book_image from "../../images/book_image.png";
import book from "../../images/book.png";

import {
    ItemImage,
} from "../../containers/Basket";
import {Books} from "../../types/Basket/action";

type Props = {
    books: Array<Books>,
    saveBasket: Function,
    dispatch: Function
};

type FormData = {
    id: number,
    name: string,
    price: number,
    amount: number,
}

export const AddElement = (props: Props) => {
    const[formData, changeFormData] = useState<FormData>({
        id: 1,
        name: "",
        price: 0,
        amount: 1,
    });
    const[openForm, changeOpenForm] = useState(false);
    const[validate, changeValidate] = useState(false);

    useEffect(()=>{
        changeValidate(():any => {
            if (formData.name !== "" && formData.price > 0 && formData.amount > 0) {
                return true
            } else {
                return false
            }
        });
    }, [formData]);

    const editFormData = (target: any) => {
        let name = target.name;
        let value = target.value;

        changeFormData({
            ...formData,
            [name]: name === "name" ? value : parseInt(value)
        });
    };

    const addBook = () => {
        let bookItems = props.books;
        formData.id = bookItems[bookItems.length - 1].id + 1;
        bookItems.unshift(formData);

        props.dispatch(props.saveBasket(bookItems));
        changeOpenForm(false);
        changeFormData({
            id: 1,
            name: "",
            price: 0,
            amount: 1,
        });
    };

    const handleKeyPressCode = (e:any) => {
        if (e.key === "Enter" && validate) {
            return addBook();
        }
    };

    return (
        <AddBookWrapper>
            <AddBook openForm={openForm}>
                <SpanAction onClick={()=>{changeOpenForm(!openForm)}}>
                    Добавить книгу...
                </SpanAction>
                <ImageAddBook src={book}/>
            </AddBook>
            <BookItem openForm={openForm}>
                {validate ? (
                    <SaveButton
                        validate={validate}
                        onClick={()=>{addBook()}}
                    >Сохранить</SaveButton>
                ) : (
                    <SaveButton
                        validate={validate}
                    >Заполните все поля корректно</SaveButton>
                )}
                <ItemImage>
                    <Image src={book_image}/>
                </ItemImage>
                <AddColsInput>
                    <AddLabel>
                        Название:
                    </AddLabel>
                    <AddInput
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e)=>{editFormData(e.target)}}
                        onKeyPress={(e) => {handleKeyPressCode(e)}}
                    />
                </AddColsInput>
                <AddColsInput>
                    <AddLabel>
                        Стоимость:
                    </AddLabel>
                    <AddInput
                        type="number"
                        step="50"
                        name="price"
                        value={formData.price}
                        onChange={(e)=>{editFormData(e.target)}}
                        onKeyPress={(e) => {handleKeyPressCode(e)}}
                    />
                </AddColsInput>
                <AddColsInput>
                    <AddLabel>
                        Колличество:
                    </AddLabel>
                    <AddInput
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={(e)=>{editFormData(e.target)}}
                        onKeyPress={(e) => {handleKeyPressCode(e)}}
                    />
                </AddColsInput>
            </BookItem>
        </AddBookWrapper>
    );
};

const AddBookWrapper = styled.div`
    position: relative;
    width: calc(100% / 4 - 2rem);
    margin-bottom: 4rem;
    
    @media(max-width: 992px){
        width: calc(100% / 2 - 1rem);
    }
`;

const BookItem = styled.form<any>`
    width: 100%;
    position: absolute;
    top: ${({openForm}) => openForm ? "0" : "65px"};
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: ${({openForm}) => openForm ? "1" : "0"};
    transition: .3s linear;
`;

const SaveButton = styled.div<any>`
    width: 90%;
    height: 75px;
    border-radius: 4px;
    transition: .3s linear;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 1rem;
    background: ${({validate}) => validate ? "#22ab00" : "#ca1e0e"};
    cursor: ${({validate}) => validate ? "pointer" : "not-allowed"};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "Rubik";
    color: #fff;
    z-index: 1;
    text-align: center;
`;

const AddBook = styled(BookItem)`
    height: 100%;
    justify-content: center;
    align-items: center;
    top: ${({openForm}) => openForm ? "65px" : "0"};
    opacity: ${({openForm}) => !openForm ? "1" : "0"};
`;

export const Image = styled.img`
    width: 100%;
    border-radius: 4px;
    z-index: -1;
    opacity: .2;
`;

const ImageAddBook = styled.img`
    margin-top: 15px;
    width: 5rem;
    transition: .1s linear;
`;

const SpanAction = styled.span`
    cursor: pointer;
    text-align: center;
    font-family: "Rubik";
    font-size: 18px;
    transition: .3s linear;
    z-index: 1;
    
    &:hover{
        opacity: .6;
        color: darkred;
    }
    
    &:hover + ${ImageAddBook}{
        opacity: .6;
    }
`;

const AddInput = styled.input`
    border: none;
    border-bottom: 1px solid #223;
    padding: 4px 0;
    font-size: 18px;
    text-align: center;
    margin-left: 12px;
    width: 100%;
`;

const AddColsInput = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
`;

const AddLabel = styled.label`
    min-width: 5rem;
    font-size: 16px;
`;