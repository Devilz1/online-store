import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import book_image from "../../../images/book_image.png";
import book from "../../../images/book.png";

import {useDispatch} from "react-redux";
import {saveBasket} from "../../../actions/BasketAction";
import {CSSTransition} from "react-transition-group";

export type FormDataBook = {
    id: number | null,
    name: string,
    price: number,
    amount: number,
}

export const AddElement = () => {
    const[formData, changeFormData] = useState<FormDataBook>({
        id: null,
        name: "",
        price: 0,
        amount: 1,
    });
    const[openForm, changeOpenForm] = useState(false);
    const[validate, changeValidate] = useState(false);
    const dispatch = useDispatch();

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
        dispatch(saveBasket(formData));
        changeOpenForm(false);
        changeFormData({
            id: null,
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
            <CSSTransition in={!openForm} timeout={200} classNames={'add_block'} unmountOnExit>
                {() => <AddBook>
                    <SpanAction onClick={()=>{changeOpenForm(!openForm)}}>
                        Добавить книгу...
                    </SpanAction>
                    <ImageAddBook src={book}/>
                </AddBook>}
            </CSSTransition>
            <CSSTransition in={openForm} timeout={200} classNames={'add_form'} unmountOnExit>
                {() => <BookItem>
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
                    <AddImage>
                        <Image src={book_image}/>
                    </AddImage>
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
                </BookItem>}
            </CSSTransition>
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
    
    @media(max-width: 526px){
        width: calc(100% - 0.5rem);
    }
`;

const BookItem = styled.form<any>`
    width: 100%;
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    &.add_form-enter{
        transition: 200ms linear;
        opacity: 0;
    }
    &.add_form-enter-active{
        transition: 200ms linear;
        opacity: 1;
    }
    &.add_form-exit{
        top: 65px;
        opacity: 1;
    }
    &.add_form-exit-active{
        top: 65px;
        opacity: 0;
    }
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
    opacity: .8;
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

const AddImage = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    margin-top: -50px;
    padding-top: 50px;
    cursor: default;
`;

const AddBook = styled(BookItem)`
    height: 100%;
    justify-content: center;
    align-items: center;
    top: 75px;
    
    &.add_block-enter{
        opacity: 0;
    }
    &.add_block-enter-active{
        opacity: 1;
    }
    &.add_block-exit{
        transition: 200ms linear;
        top: 65px;
        opacity: 1;
    }
    &.add_block-exit-active{
        transition: 200ms linear;
        top: 65px;
        opacity: 0;
    }
`;

export const Image = styled.img`
    width: 100%;
    border-radius: 4px;
    z-index: -1;
    opacity: .2;
`;

const ImageAddBook = styled.img`
    margin-top: 15px;
    width: 7rem;
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
        opacity: .8;
        color: darkred;
    }
`;

const AddInput = styled.input`
    border: none;
    border-bottom: 1px solid #bebebe;
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
    min-width: 40%;
    font-size: 16px;
`;