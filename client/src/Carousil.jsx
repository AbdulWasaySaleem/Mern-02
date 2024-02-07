import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousil = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,  // Enable autoplay
    autoplaySpeed: 2000,  // Set autoplay speed in milliseconds (adjust as needed)
  };

  return (
    <div className="w-1680 h-616 mx-auto">
      <Slider {...settings}>
        <div>
          <img src="https://icms-image.slatic.net/images/ims-web/87a71d56-52a7-4961-8318-4e930af6e78e.png" alt="Slide 1" />
        </div>
        <div>
          <img src="https://icms-image.slatic.net/images/ims-web/4aa8ed81-6c4f-4e4c-8beb-e440a773ffb3.jpg" alt="Slide 2" />
        </div>
        <div>
          <img src="https://icms-image.slatic.net/images/ims-web/b5def08d-e14d-4185-aa67-f72e99c995e9.jpg" alt="Slide 3" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousil