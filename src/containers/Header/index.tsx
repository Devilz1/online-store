import React from 'react';
import styled from "styled-components";
import { A } from 'hookrouter';

type Props = {
    routeResult: any
};

export const Header = (props: Props) => {
    return (
        <HeaderWrapper>
            <Nav>
                <Link href="/">Главная</Link>
                <Link href="/basket">Корзина</Link>
            </Nav>
        </HeaderWrapper>
    );
};

const HeaderWrapper = styled.header`
    width: 100%;
    min-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding: 10px 0;
    margin-bottom: 3.5rem;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    min-width: 320px;
`;

const Link = styled(A)`
    font-family: "Rubik";
    font-weight: 500;
    text-decoration: none;
    transition: opacity .3s linear .1s;
    opacity: .7;
    color: #223;
    
    &:hover{
        opacity: 1;
    }
`;