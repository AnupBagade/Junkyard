import React, { Component } from 'react';
import MenuManagement from './MenuManagement/MenuManagement';


class Admin extends Component{

  constructor(props){
      super(props);
  }

  render(){
    return(
      <MenuManagement />
    )
  }
}

export default Admin;
