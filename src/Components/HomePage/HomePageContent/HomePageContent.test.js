import { shallow } from 'enzyme';
import React from 'react';
import {HomePageContent} from '../../../Components/HomePage/HomePageContent/HomePageContent';
import {findByTestAttr} from '../../../Utils/Testing/TestingUtilities';


describe('HomePageContent with props', () => {

  const initialState = {
    menuItems : [
      {
        imageURI: "https://firebasestorage.googleapis.com/v0/b/junkya…=media&token=5ee6f4f2-9509-431f-93f0-fdd5ff9e86b7",
        menuName: "menuPizza",
        menuNameKey: "MENUPIZZA",
        variants: 10
      },
      {
        imageURI: "https://firebasestorage.googleapis.com/v0/b/junkya…=media&token=5ee6f4f2-9509-431f-93f0-fdd5ff9e86b7",
        menuName: "menuBurger",
        menuNameKey: "MENUBURGER",
        variants: 10
      }
    ]
  }

  let store;
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<HomePageContent menuItems={initialState.menuItems}/>)
  })

  it('Renders homepage content container', () => {
    const component = findByTestAttr(wrapper, 'homepage-content')
    expect(component.length).toBe(1)
    expect(wrapper.find('CustomLoader').length).toBe(0);
  })

  it('Renders card for every item in menuItems array', () => {
    const component = wrapper.find('Card');
    expect(component.length).toBe(initialState.menuItems.length);
  })

  it('Render every card with "menuName" as link', () =>{
    initialState.menuItems.map(item => {
      let component = wrapper.find(`Link[to="/${item.menuName}"]`)
      expect(component.length).toBe(1)
    })
  })

  it('Render every card with the correct image source', () => {
    initialState.menuItems.map(item => {
      let component = findByTestAttr(wrapper, `menu-item-card-${item.menuNameKey}`);
      expect(component.props()).toHaveProperty('cover.props.src', item.imageURI)
    })
  })

  it('Render title of menu item with styles', () => {
    initialState.menuItems.map(item => {
      let component = findByTestAttr(wrapper, `menu-item-title-${item.menuNameKey}`);
      expect(component.prop('title').props).toStrictEqual({ level: 3, style: { color: '#000000' }, children: item.menuName });
      expect(component.prop('style').textAlign).toBe('center');
    })
  })
})

describe('HomePageContent without props', () =>{

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomePageContent menuItems={[]} />)
  })

  it('Render CustomLoader',  () => {
    expect(wrapper.find('CustomLoader').length).toBe(1);
    expect(wrapper.find('Card').length).toBe(0);
  })

})
