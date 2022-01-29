import {shallow, mount} from 'enzyme';
import Enzyme from 'enzyme';
import JunkItems from './JunkItems';
import React, {useLayoutEffect} from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

/*
    1. Render JunkItems with props - MenuName. Example - Burger.
    2. Validate the existence of JunkItem cards.
    3. Validate JunkItem card props - title, image.
    4. Validate the style of Card container.
    5. Validate the number of JunkItem cards with recieved data.
    6. Validate the existence of Go To Card button.
*/

describe('Render JunkItems with props.', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<JunkItems />);
    });

    it('Validate existence of JunkItem Cards', () => {
        console.log(JunkItems.items)
        console.log(wrapper.find('JunkItem'))
    })

    it('Validate onScroll Event is executed', () => {

    })
})
