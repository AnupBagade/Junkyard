import React from 'react';
import {shallow} from 'enzyme';
import JunkYardHeader from './Header';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {findByTestAttr} from '../../Utils/Testing/TestingUtilities';

const setUp = (props={}) => {
  const component = shallow(<JunkYardHeader {...props} />);
  return component
}

describe('Header Component', () => {

  let component;
  beforeEach(() => {
    component = setUp();
  })

  it('Render navbar', () => {
    const wrapper = findByTestAttr(component, 'header-navbar');
    expect(wrapper.length).toBe(1);
    expect(wrapper.prop('variant')).toBe('dark');
    expect(wrapper.prop('bg')).toBe('dark');
    expect(wrapper.prop('fixed')).toBe('top')
  })

  it('Render app title', () => {
    const wrapper = findByTestAttr(component, 'app-title');
    expect(wrapper).toHaveLength(1);
    expect(wrapper.text()).toBe('JunkYard')
    expect(wrapper.prop('style')).toStrictEqual({font:"16", fontFamily:"Rock Salt"});
  })

  it('Render search form', () => {
    const wrapper = findByTestAttr(component, 'header-search-form');
    expect(wrapper).toHaveLength(1);
    expect(wrapper.prop('placeholder')).toBe('Search')
  })

  it('Render search form - Search Button', () =>{
    const wrapper = findByTestAttr(component, 'header-search-button');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('Search')
    expect(wrapper.prop('variant')).toBe('success');
  })

  it('Render orders button', () => {
    const wrapper = findByTestAttr(component, 'header-orders-link');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('Orders');
    expect(wrapper.prop('href')).toBe('#home');
  })

  it('Render cart button', () => {
    const wrapper = findByTestAttr(component, 'header-cart-link');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('Cart');
    expect(wrapper.prop('href')).toBe('#link');
  })

  it('Render My Account dropdown', () => {
    const wrapper = findByTestAttr(component, 'header-my-account-dropdown');
    expect(wrapper.length).toBe(1);
    expect(wrapper.prop('title')).toBe('My Account');
    expect(wrapper.children().length).toBe(5);
  })

  it('Render My Account dropdown children - Action', () => {
    const wrapper = findByTestAttr(component, 'my-account-action');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('Action');
    expect(wrapper.prop('href')).toBe('#action/3.1');
  })

  it('Render My Account dropdown children - Another Action', () => {
    const wrapper = findByTestAttr(component, 'my-account-another-action');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('Another action');
    expect(wrapper.prop('href')).toBe('#action/3.2');
  })

  it('Render My Account dropdown children - Something', () => {
    const wrapper = findByTestAttr(component, 'my-account-something');
    expect(wrapper.length).toBe(1)
    expect(wrapper.text()).toBe('Something');
    expect(wrapper.prop('href')).toBe('#action/3.3')
  })

  it('Render My Account dropdown children - divider', () => {
    const wrapper = findByTestAttr(component, 'my-account-divider');
    expect(wrapper.length).toBe(1)
  })

  it('Render My Account dropdown children - Separated Link', () => {
    const wrapper = findByTestAttr(component, 'my-account-separated-link');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('Separated link');
    expect(wrapper.prop('href')).toBe('#action/3.4');
  })
})
