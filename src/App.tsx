import React from 'react';
import {MainComponent} from "./containers/Main";
import {BasketComponent} from "./containers/Basket";
import {useRoutes} from "hookrouter";
import {Header} from "./containers/Header";
import styled from 'styled-components';
import {NotPageFound} from "./containers/NotPageFound";
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router-dom";

export const routes = {
  "/": () => <MainComponent />,
  "/basket": () => <BasketComponent />,
};

function App() {
    const routeResult = useRoutes(routes);

    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppWrapper>
                    <Header routeResult={routeResult}/>

                    {routeResult || <NotPageFound/>}
                </AppWrapper>
            </Provider>
        </BrowserRouter>
    );
}

export default App;

const AppWrapper: any = styled.div`
    width: 100%;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    margin: 0 auto 56px;
`;