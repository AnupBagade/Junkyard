import React from 'react';
import {shallow} from 'enzyme';
import UpdateDeleteMenu from './UpdateDeleteMenu';

/*
    1. Render with props and validate the existence of customized table component.
    2. Validate styles of container.
    3. validate the props recieved from Admin component.
    4. Validate the props passed to CustomizedTable component.
*/

const updateDeleteColumns = ['Menu', 'Variants', 'Update', 'Delete']
const updateMenuHandler = () => {
    return 'updateMenuHandler'
}
const deleteMenuHandler = () => {
    return 'deleteMenuHandler'
}
const firebaseMenuData = []

describe('Render "UpdateDeleteMenu" with props', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <UpdateDeleteMenu
                updateDeleteColumns={updateDeleteColumns}
                firebaseMenuData={firebaseMenuData}
                updateMenuHandler={updateMenuHandler}
                deleteMenuHandler={deleteMenuHandler}/>);
    })

    it('Validate customized table is rendered', () => {
        const component = wrapper.children().find('UpdateDeleteMenuTable')
        expect(component.length).toBe(1);
        expect(component.prop('columns')).toStrictEqual(updateDeleteColumns);
        expect(component.prop('rows')).toStrictEqual(firebaseMenuData);
        expect(component.prop('updateMenu')()).toBe('updateMenuHandler');
        // expect(component.prop('deleteMenuHandler')()).toBe('deleteMenuHandler');
    })
})
