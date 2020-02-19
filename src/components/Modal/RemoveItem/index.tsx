import React, {useState, Fragment} from 'react';
import styled from 'styled-components';
import {removeItem} from "../../../actions/BasketAction";
import basket from "../../../images/basket.png";
import {useDispatch} from "react-redux";
import { CSSTransition } from 'react-transition-group';
import minus from "../../../images/minus.svg";
import {ImageIcon, Minus} from "../../../containers/Basket";

type Props = {
    bookId: number,
    delete: string
};

export const RemoveItem = (props: Props) => {
    const[openModal, toggleModal] = useState(false);
    const dispatch = useDispatch();

    const closeModal = (id: number) => {
        dispatch(removeItem(id));
        toggleModal(false);
    };

    const stopProp = (e: any) => {
        e.stopPropagation();
    };

    return (
        <Fragment>
            {props.delete === "all" ? (
                <Delete onClick={() => {toggleModal(true)}}>
                    <IconDelete src={basket}/>
                    <Tooltip>
                        Удалить из корзины
                    </Tooltip>
                </Delete>
            ) : (
                <Minus onClick={() => {toggleModal(true)}}>
                    <ImageIcon src={minus}/>
                </Minus>
            )}
            <CSSTransition in={openModal} timeout={200} classNames="modal" unmountOnExit>
                {() => <Modal onClick={()=>{toggleModal(false)}}>
                    <CSSTransition in={openModal} timeout={200} classNames="modal-wrapper" unmountOnExit>
                        {() => <ModalWrapper onClick={(e)=>{stopProp(e)}}>
                            <ModalHeader>
                                Вы уверены, что хотите удалить товар из корзины?
                            </ModalHeader>
                            <ModalContent>
                                <ButtonAction onClick={() => {closeModal(props.bookId)}}>
                                    Удалить
                                </ButtonAction>
                                <ButtonAction onClick={() => {toggleModal(false)}}>
                                    Отмена
                                </ButtonAction>
                            </ModalContent>
                        </ModalWrapper>}
                    </CSSTransition>
                </Modal>}
            </CSSTransition>
        </Fragment>
    );
};

const Modal = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.7);
    z-index: 100;
    cursor: default;
    
    &.modal-enter{
        transition: 200ms linear;
        opacity: 0;
    }
    &.modal-enter-active{
        transition: 200ms linear;
        opacity: 1;
    }
    &.modal-exit{
        transition: 200ms linear;
        opacity: 1;
    }
    &.modal-exit-active{
        transition: 200ms linear;
        opacity: 0;
    }
`;

const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    max-width: 410px;
    min-width: 336px;
    max-height: 195px;
    border-radius: 22% 0 22% 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px 12px;
    user-select: none;
    cursor: default;
    
    &.modal-wrapper-enter{
        transition: 100ms linear;
        transform: scale(0.8);
        opacity: 0;
    }
    &.modal-wrapper-enter-active{
        transition: 100ms linear;
        transform: scale(1);
        opacity: 1;
    }
    &.modal-wrapper-exit{
        transition: 100ms linear;
        transform: scale(1);
        opacity: 1;
    }
    &.modal-wrapper-exit-active{
        transition: 100ms linear;
        transform: scale(0.8);
        opacity: 0;
    }
`;

const ModalHeader = styled.div`
    font-size: 22px;
    font-weight: 400;
    text-align: center;
    padding: 0 15px;
`;

const ModalContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    
    @media(max-width: 768px){
        flex-direction: column;
        justify-content: center;
    }
`;

const ButtonAction = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 22px;
    background: brown;
    color: #fff;
    border: 1px solid brown;
    border-radius: 4px;
    margin-right: 15px;
    cursor: pointer;
    
    &:hover{
        background: #fff;
        color: brown;
    }
    
    @media(max-width: 768px){
        margin-right: 0;
        margin-bottom: 15px;
        max-width: 210px;
        width: 100%;
    }
`;

const Tooltip = styled.div`
    position: absolute;
    top: -9px;
    left: -100%;
    padding: 5px 10px;
    background: rgba(0,0,0,.7);
    color: #fff;
    font-size: 10px;
    display: none;
    border-radius: 2px;
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
    
    &:hover ${Tooltip} {
        display: block;
    }
`;

export const IconDelete = styled.img`
    width: 30%;
    height: auto;
    position: absolute;
    top: 14px;
    left: 18px;
`;