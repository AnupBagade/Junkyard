import { Carousel, Container } from 'react-bootstrap';
import HomePageSliderOne from '../../../Media/Images/SliderImages/homepagesliderone.jpg';
import HomePageSliderTwo from '../../../Media/Images/SliderImages/homepageslidertwo.jpg';
import HomePageSliderThree from '../../../Media/Images/SliderImages/homepagesliderthree.jpg';
import HomePageSliderFour from '../../../Media/Images/SliderImages/homepagesliderfour.jpg';
import HomePageSliderFive from '../../../Media/Images/SliderImages/homepagesliderfive.jpg';
import HomePageSliderStyle from './HomePageSlider.module.css';

const HomePageSlider = (props) =>{
    return(
        <Carousel>
            <Carousel.Item  className={HomePageSliderStyle.carouselStyle}>
                <img
                className="d-block img-fluid"
                src={HomePageSliderOne}
                alt="First slide"
                style={{objectFit:"contain"}}
                />
                <h2 className={HomePageSliderStyle.imageOne}>Looking for real spice challenge, try our <br /><span className={HomePageSliderStyle.imageTextOne}>CHICKEN SPECIALS</span></h2>
            </Carousel.Item>
            <Carousel.Item  className={HomePageSliderStyle.carouselStyle}>
                <img
                className="d-block img-fluid"
                src={HomePageSliderTwo}
                alt="Second slide"
                />
                <h3 className={HomePageSliderStyle.imageTwo}>Our <span className={HomePageSliderStyle.imageTextTwo}>REFRESH</span> fuels, can take back<br /> you to<span className={HomePageSliderStyle.imageTextTwo}> SUMMER</span></h3>
            </Carousel.Item>
            <Carousel.Item  className={HomePageSliderStyle.carouselStyle}>
                <img
                className="d-block img-fluid"
                src={HomePageSliderThree}
                alt="Third slide"
                />
                <h2 className={HomePageSliderStyle.imageThree}>Eventhough name is
                <span className={HomePageSliderStyle.imageTextThree}> Junkyard</span>,<br />we always serve <span className={HomePageSliderStyle.imageTextThree}>FRESH</span> and <span className={HomePageSliderStyle.imageTextThree}>BEST</span>.</h2>
            </Carousel.Item>
            <Carousel.Item  className={HomePageSliderStyle.carouselStyle}>
                <img
                className="d-block img-fluid"
                src={HomePageSliderFour}
                alt="Fourth slide"
                />
                <h2 className={HomePageSliderStyle.imageFour}>In Junkyard, We serve <span className={HomePageSliderStyle.imageTextFour}>HEALTHY</span><br /> with <span className={HomePageSliderStyle.imageTextFour}>TASTE</span></h2>
            </Carousel.Item>
            <Carousel.Item  className={HomePageSliderStyle.carouselStyle}>
                <img
                className="d-block img-fluid"
                src={HomePageSliderFive}
                alt="Fifth slide"
                />
                <h1 className={HomePageSliderStyle.imageFive}>In Junkyard, <span className={HomePageSliderStyle.imageTextFive}>SPECIALS</span> always <br /><span className={HomePageSliderStyle.imageTextFive}>SURPRISE</span> you!!!</h1>
            </Carousel.Item>
        </Carousel>
    )
}


export default HomePageSlider;
