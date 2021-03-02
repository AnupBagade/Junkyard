import React, { Component } from 'react';
// import { Layout } from 'antd';
import HomePageSlider from '../../Components/HomePage/HomePageSlider/HomePageSlider';
import HomePageContent from '../../Components/HomePage/HomePageContent/HomePageContent';
import Auxiliary from '../../Auxiliary/Auxiliary';
import { withRouter } from 'react-router-dom';


class HomePage extends Component{
  render(){
    return(
      <Auxiliary>
        <HomePageSlider />
        <HomePageContent />
      </Auxiliary>
    )
  }
}

export default withRouter(HomePage);
