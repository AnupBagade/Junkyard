import {shallow, simulate} from 'enzyme';
import UpdateDeleteMenuTable from './UpdateDeleteMenuTable';
import {findByTestAttr} from '../../../../../Utils/Testing/TestingUtilities';

/*
    1. Render UpdateDeleteMenuTable with props.
    2. Validate table head existence and it's style.
    3. validate the count of columns "th" with the length of props.column passed.
    4. Validate the existence of table body.
    5. Validate number of rows rendered corresponding to the data passed as prop.
    6. Validate table data cells - menuName, variants, update icon and delete icon.
    7. validate update operation.
    8. Validate delete operation.
*/

const firebaseMenuData = [
    {
        menuId: "-MUhnOcGBLfsX-uuwuMY",
        menuName: "menuPizza",
        menuNameKey: "MENUPIZZA",
        variants: 10
    },
    {
        menuId: "-MUhnaB_FUaGmkoeDl2s",
        menuName: "menuPasta",
        menuNameKey: "MENUPASTA",
        variants: 10
    },
    {
        menuId: "-MUhxiRkd2ShUZ5dwDsK",
        menuName: "menuFries",
        menuNameKey: "MENUFRIES",
        variants: 10
    }
]
const tableColumns = ['Menu', 'Variants', 'Update', 'Delete']
const updateHandler = jest.fn();
const deleteHandler = jest.fn();
const props = {
    columns: tableColumns,
    rows: firebaseMenuData,
    updateMenu: updateHandler,
    deleteMenu: deleteHandler
}
const identifiers = {
    tableHeader: 'update-delete-menu-table-header',
    tableBody: 'update-delete-menu-table-body',
    tableBodyRowName: 'update-delete-menu-table-row-',
    tableBodyMenuName : 'update-delete-menu-table-body-menuName',
    tableBodyMenuVariant: 'update-delete-menu-table-body-variant',
    tableBodyMenuUpdate: 'update-delete-menu-table-body-update',
    tableBodyMenuDelete: 'update-delete-menu-table-body-delete'
}
const headerStyles = {color:"white", backgroundColor:"#212529"};

describe('Render UpdateDeleteMenuTable with props', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<UpdateDeleteMenuTable {...props}/>)
    })

    it('Render "UpdateDeleteMenuTable" with no errors', () => {
        let component = findByTestAttr(wrapper, identifiers.tableHeader);
        expect(component.length).toBe(1);
        component = findByTestAttr(wrapper, identifiers.tableBody);
        expect(component.length).toBe(1);
    })

    it('Validate UpdateDeleteMenuTable header style', () => {
        const component = findByTestAttr(wrapper, identifiers.tableHeader);
        expect(component.prop('style')).toStrictEqual(headerStyles);
    })

    it('Validate UpdateDeleteMenuTable header cells count', () => {
        const component = findByTestAttr(wrapper, identifiers.tableHeader);
        expect(component.children().find('th').length).toBe(tableColumns.length);
    })

    it('Validate UpdateDeleteMenuTable body rows count', () => {
        const component = findByTestAttr(wrapper, identifiers.tableBody);
        expect(component.children().find('tr').length).toBe(firebaseMenuData.length);
    })

    it('Validate UpdateDeleteMenuTable each rows values', () => {
        firebaseMenuData.map(item => {
            let component = findByTestAttr(wrapper, identifiers.tableBodyRowName+item.menuNameKey);
            expect(findByTestAttr(component, identifiers.tableBodyMenuName).text()).toBe(item.menuName);
            expect(findByTestAttr(component, identifiers.tableBodyMenuVariant).text()).toBe((item.variants).toString());
            expect(findByTestAttr(component, identifiers.tableBodyMenuUpdate).find('BsPencil').length).toBe(1);
            expect(findByTestAttr(component, identifiers.tableBodyMenuDelete).find('BsTrashFill').length).toBe(1);
        })
    })

    it('Validate UpdateDeleteMenuTable - update/delete handler is called', () => {
        firebaseMenuData.map(item => {
            let component = findByTestAttr(wrapper, identifiers.tableBodyRowName+item.menuNameKey);
            findByTestAttr(component, identifiers.tableBodyMenuUpdate).find('BsPencil').simulate('click');
            expect(updateHandler).toHaveBeenCalled();
            findByTestAttr(component, identifiers.tableBodyMenuDelete).find('BsTrashFill').simulate('click');
            expect(deleteHandler).toHaveBeenCalled();
        })

    })
})
