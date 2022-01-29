import {shallow, mount} from 'enzyme';
// import jest from 'jest';
import React from 'react';
import Enzyme from 'enzyme';
import MenuManagement from './MenuManagement';
import AddMenu from './AddMenu/AddMenu';
import UpdateDeleteMenu from './UpdateDeleteMenu/UpdateDeleteMenu';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

/*
    1. Validate existence of AddMenu and UpdateDeleteMenu.
    2. Validate props passed to AddMenu.
    3. Validate props passed to UpdateDeleteMenu.
    8. Simulate updateMenuHandler and verify the state changes.
    9. Simulate deleteMenuHandler and verify the state changes.
    10. SImulate loadMenuTable and verify the state changes.
    11. Validate loadData initialData.
    12. Validate getMenuFirebaseDetails is called during mounting and loadData state changes.
*/

const initialState = {
    initialMenuValues : {
        requestType:'Menu',
        menuName:'',
        imageURI:'',
    },
    loadData : false,
    loading : false,
    firebaseMenuData : []
}
const mockUpdateDeleteColumns = ['Menu', 'Variants', 'Update', 'Delete'];
const mockFirebaseColumns = ['menuName', 'variants', 'menuNameKey'];

describe('Render MenuManagement with props.', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<MenuManagement />);
    });

    it('Validate existence of AddMenu and UpdateDeleteMenu components.', () => {
        expect(wrapper.find('AddMenu').length).toBe(1);
        expect(wrapper.find('UpdateDeleteMenu').length).toBe(1);
    })

    it('Validate props passed to AddMenu', () => {
        const component = wrapper.find('AddMenu');
        expect(component.prop('initialData')).toStrictEqual(initialState.initialMenuValues);
    })

    it('Validate props pased to UpdateDeleteMenu', () => {
        const component = wrapper.find('UpdateDeleteMenu');
        expect(component.prop('updateDeleteColumns')).toStrictEqual(mockUpdateDeleteColumns);
    })
})

describe('Validate MenuManagement handlers and state', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<MenuManagement />);
    });

    it('Validate initialMenuValues of MenuManagement', () => {
        expect(wrapper.state().initialMenuValues).toStrictEqual(initialState.initialMenuValues)
    })

    it('Validate customLoader is displayed depending on "loading" state.', () => {
        wrapper.setState({
            ...initialState,
            ['loading'] : true
        })
        expect(wrapper.find('CustomLoader').length).toBe(1);
        wrapper.setState({
            ...initialState,
            ['loading'] : false
        })
        expect(wrapper.find('CustomLoader').length).toBe(0);
    })

    it('Validate getMenuFirebaseDetails is called after mouting', () => {
        // const mockedGetMenuFirebaseDetails = jest.fn();
        const instance = wrapper.instance();
        // instance.getMenuFirebaseDetails = mockedGetMenuFirebaseDetails;
        const spy = jest.spyOn(instance, 'getMenuFirebaseDetails');
        expect(spy).toHaveBeenCalledTimes(0);
        instance.componentDidMount();
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it('Validate getMenuFirebaseDetails is executed if loadData state changes', () => {
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'getMenuFirebaseDetails');
        expect(spy).toHaveBeenCalledTimes(0);
        instance.setState({
            ...initialState,
            ['loadData'] : !initialState.loadData
        })
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it('Validate updateDeleteColumns values', () => {
        expect(wrapper.instance().updateDeleteColumns).toStrictEqual(mockUpdateDeleteColumns);
    })

    it('Validate firebaseColumns values', () => {
        expect(wrapper.instance().firebaseColumns).toEqual(mockFirebaseColumns);
    })

})
