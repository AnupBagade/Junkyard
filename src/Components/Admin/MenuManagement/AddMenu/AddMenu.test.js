import {shallow} from 'enzyme';
import {findByTestAttr} from '../../../../Utils/Testing/TestingUtilities';
import AddMenu from './AddMenu';

/*
  1. Parent component = MenuManagement
  2. Recieved props are:
      - Form initialData
      - Load Menu Table Handler
  3. Validate Form rendering with props
  4. Validate Formik existance
  5. Create props required for Formik and render Formik component
  6. Create mock function to upload image and menu details to firebase
  7. Validate Form fields and their props
  8. Validate CustomLoader rendering
  9. Validate Submit button rendering and onClick action
*/
const initialMenuValues = {
	requestType: 'Menu',
	menuName: '',
	imageURI: '',
}

const menuItemValue = {
	requestType: 'Menu',
	menuName: 'menuBurger',
	imageURI: 'https://firebasestorage.googleapis.com/v0/b/junkya…=media&token=5ee6f4f2-9509-431f-93f0-fdd5ff9e86b7',
}

describe('Render Add Menu with props', () => {

	let wrapper;
	beforeEach(() => {
		wrapper = shallow( < AddMenu initialData = {initialMenuValues}/>);
	})

	it('Render Add Menu container', () => {
		const component = wrapper.find('Container');
		expect(component.length).toBe(1);
		expect(component.prop('style')).toStrictEqual({
			paddingTop: "10%",
			paddingBottom: "10%"
		})
	})

	it('Validate Header of add menu form', () => {
		const component = findByTestAttr(wrapper, 'add-menu-form-header');
		expect(component.length).toBe(1);
		expect(component.text()).toBe('Add Menu');
		expect(component.prop('style')).toStrictEqual({
			backgroundColor: "#212529",
			color: "white"
		})
	})

	it('Render Formik with required props', () => {
		const component = wrapper.find('Formik');
		expect(component.length).toBe(1)
		expect(component.prop('initialValues')).toStrictEqual(
			initialMenuValues);
		expect(component.prop('enableReinitialize')).toBe(true);
	})

	it('Validate Form passed as prop to Formik', () => {
		const component = wrapper.find('Formik').dive()
		expect(component.find('[id="menuForm"]').length).toBe(1)
	})

	// Validate Formik fields and their props and functionlaities.
	describe('Formik Fields validation', () => {

		const formFieldsName = {
			requestType: 'Request Type',
			menuName: 'Menu Name',
			imageURI: 'Menu Image'
		}

		const formFieldGroupIdentifiers = {
			requestType: 'add-menu-requestType-field',
			menuName: 'add-menu-menuName-field',
			imageURI: 'add-menu-menuImage-field'
		}

		let formComponent;

		beforeEach(() => {
			formComponent = wrapper.find('Formik').dive()
		})

		it('Validate form fields rendered', () => {
			Object.keys(formFieldsName).map(item => {
				const component = formComponent.find(`[id="${item}"]`)
				expect(component.length).toBe(1)
			})
		})

		it('Validate display name and data type of "Request Type"', () => {
			const component = findByTestAttr(formComponent, formFieldGroupIdentifiers['requestType'])
			expect(component.children().find('FormControl').prop('name')).toBe('requestType')
			expect(component.children().find('FormControl').prop('type')).toBe('text')
			expect(component.children().find('FormControl').prop('id')).toBe('requestType')
			expect(component.children().find('FormControl').prop('value')).toBe('Menu')
		})

		it('Validate display name and data type of "Menu Name"', () => {
			const component = findByTestAttr(formComponent, formFieldGroupIdentifiers['menuName'])
			expect(component.children().find('FormControl').prop('name')).toBe('menuName')
			expect(component.children().find('FormControl').prop('type')).toBe('text')
			expect(component.children().find('FormControl').prop('id')).toBe('menuName')
			expect(component.children().find('FormControl').prop('value')).toBe('')
		})

		it('Validate display name and data type of "Menu Image"', () => {
			const component = findByTestAttr(formComponent, formFieldGroupIdentifiers['imageURI'])
			expect(component.children().find('FormFile').prop('name')).toBe('imageURI')
			expect(component.children().find('FormFile').prop('id')).toBe('imageURI')
		})



	})
})

describe('Render Add Menu without props', () => {
	it('Render without props', () => {
		const component = shallow(<AddMenu />)
		expect(component.prop('initialData')).toBe(undefined)
		expect(component.prop('loadMenuTable')).toBe(undefined)
	})
})
