import { Carousel } from 'antd';
// import HomePageSliderStyle from './HomePageSlider.module.css';


const HomePageSlider = (props) => {
  const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#E5E5E5'
    // background: '#f7f9fa',
  };
  return(
    <Carousel autoplay dots={false}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
}


export default HomePageSlider;
