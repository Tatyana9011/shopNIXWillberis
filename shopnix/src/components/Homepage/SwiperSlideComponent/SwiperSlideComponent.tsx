// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation} from 'swiper';
import React from 'react';
import 'swiper/css';
import s from './SwiperSlideComponent.module.css';
import { Container, Row, Col} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import arrow from '../../../img/arrow.svg';
import { useAppDispatch } from '../../../hook/redux';
import { setFilterGoodsData, setValueGoodsData } from "../../../store/reducers/GoodsSlice";
SwiperCore.use([Navigation]);

function SwiperSlideComponent():React.FC {
  const dispatch = useAppDispatch();
  const slides = [];

  const setFilterGood = (filter:string,values:string) =>{
     dispatch(setFilterGoodsData(filter))
     dispatch(setValueGoodsData(values))
  }
  /* const swiperParams: SwiperOptions = {
      id='main' tag='section'
      navigation
      spaceBetween: 0
      slidesPerView: 1
  }; */

  const swiper = new Swiper('.swiper', swiperParams);

  for (let i = 0; i < 3; i++){
    slides.push(
      <SwiperSlide key={`slide-${ i }`}>
       <section className={ `${s.slide1} ${s.slide}`}>
				<Container>
					<Row>
						<Col className='col-lg-4 col-10 offset-lg-1 justify-content-start align-items-start' >
							<span className={s.label}>Bestseller</span>
							<h2 className={s.slideTitle}>Women's Alpargata Loafer</h2>
							<p className={s.slideDescription}>At Alpa believe in a better tomorrow, one where humanity thrives.</p>
                <NavLink onClick={() => setFilterGood('label', "Bestseller")}
                  to="/goods?category=Bestseller"
                     className={s.button}>
                    <span className={s.buttonText}>View all</span>
                    <img src={arrow} alt="" className={s.buttonIcon}/>
                </NavLink>
						</Col>
					</Row>
				</Container>
			</section>
      </SwiperSlide>
    )
  }
  return ( <Swiper
      className={s.slider}
      id='main' tag='section'
      navigation
      spaceBetween={0}
      slidesPerView={1}
    >
      {slides}
    </Swiper>
 );
};

export default SwiperSlideComponent;
