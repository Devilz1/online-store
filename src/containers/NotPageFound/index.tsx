import * as React from 'react';
import styled from 'styled-components';
import not_found_page from './../../images/not_found_page.png'

type Props = {

};
export const NotPageFound = (props: Props) => {
    return (
        <NotFoundPage>
            <Image src={not_found_page}/>
        </NotFoundPage>
    );
};

const NotFoundPage = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    
`;