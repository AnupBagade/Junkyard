import React, { Component } from 'react';
import HomePageSlider from '../../Components/HomePage/HomePageSlider/HomePageSlider';
import HomePageContent from '../../Components/HomePage/HomePageContent/HomePageContent';
import JunkyardFooter from '../../Components/Footer/Footer';
import HomePageInformation from '../../Components/HomePage/HomePageInformation/HomePageInformation';
import Auxiliary from '../../Auxiliary/Auxiliary';
import { withRouter } from 'react-router-dom';


class HomePage extends Component{
  render(){
    return(
      <Auxiliary>
        <HomePageSlider />
        <HomePageInformation />
        <HomePageContent/>
        <JunkyardFooter />
      </Auxiliary>
    )
  }
}

export default withRouter(HomePage);
