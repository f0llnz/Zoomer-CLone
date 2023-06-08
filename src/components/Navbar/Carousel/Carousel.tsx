import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import ImageOne from './Images/1.png'
import ImageTwo from './Images/2.png'
import ImageThree from './Images/3.png'
import ImageFour from './Images/4.png'
import ImageFive from './Images/5.png'

import './Carousel.scss'

function CarouselZ(): JSX.Element {
  return (
    <div className="Carousel">
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={ImageOne}
                    alt="First slide"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={ImageTwo}
                    alt="Second slide"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={ImageThree}
                    alt="Third slide"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={ImageFour}
                    alt="Third slide"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={ImageFive}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    </div>
  );
}

export default CarouselZ;