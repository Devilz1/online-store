import React from 'react';
import styled from "styled-components";
import {A} from "hookrouter";

export const MainComponent = () => {
    return (
        <MainWrapper>
            <Linked href='/basket'>
                Добавить книгу в корзину
            </Linked>
        </MainWrapper>
    );
};

const MainWrapper = styled.div`
    
`;

const Linked = styled(A)`
    text-decoration: none;
    color: #223;
    
    &:hover{
        color: brown;
    }
`;
