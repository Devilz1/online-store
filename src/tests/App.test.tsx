import React from "react";
import {configure, mount, shallow} from "enzyme";
import {BasketComponent} from "./../containers/Basket";
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import {store} from "./../store";
import {RemoveItem} from "../components/Modal/RemoveItem";
import {Header} from "../containers/Header";
import App from "../App";

configure({adapter: new Adapter()});
describe('Basket Component', () => {
    it("should renders 'AppComponents'", () => {
        const wrapper = shallow(
            <Provider store={store}>
              <App/>
            </Provider>
        );

        expect(wrapper.exists()).toBe(true);
    });

    it("should renders 'BasketComponents'", () => {
        const wrapper = mount(
            <Provider store={store}>
                <BasketComponent/>
            </Provider>
        );

        expect(wrapper.exists()).toBe(true);
    });

    it("should renders 'Header'", () => {
        const wrapper = mount(
            <Provider store={store}>
                <App/>
            </Provider>
        );

        expect(wrapper.find('Header').exists()).toBe(true);
    });

    it("should renders 'Modal'", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <RemoveItem/>
            </Provider>
        );

        expect(wrapper.exists()).toBe(true);
    });
});