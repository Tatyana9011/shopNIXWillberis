import { Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Card from './Card/Card';
import s from '../CardWrap.module.css';
import arrow from '../../../../img/arrow.svg';
import { useAppDispatch } from '../../../../hook/redux';
import { setFilterGoodsData, setValueGoodsData } from "../../../../store/reducers/GoodsSlice";


function PreviewCard() {
  const dispatch = useAppDispatch();
  
  const setFilterGood = (filter:string, values:string) =>{
     dispatch(setFilterGoodsData(filter))
     dispatch(setValueGoodsData(values))
  }
  return (
      <Row className='mb-4'>
      <Card
        navLink={"/goods?category=Accessories"}
          classWrap={`${s.card1} ${s.card} mb-4`}
          classh3={s.cardTitel}
          textH3 = {'Fashion Month Ready in Capital Shop'}
          classP={s.cardText}
        textP={'Bags & Acsessories & Lingerie & Sportswear & Beauty & Swimwear'}
        filter={'category'}
        values={"Accessories"}
        />
      <Card
        navLink={"/goods?category=Shoes"}
          classWrap={`${s.card2} ${s.card} mb-4`}
          classh3={`${s.cardTitel} ${s.textLight}`}
          textH3 = {'Catch the Sun: Spring Break Styles From $5.99'}
          classP={`${s.cardText} ${s.textLight}`}
        textP={'Sweaters & Hoodies & Puffer Jackets & Coats and Jackets & Knit'}
        filter={'category'}
        values={'Shoes'}
        />
        <div className="col-xl-9 col-lg-6 mb-4 absolute">
          <div className={`${s.card3} ${s.card}`}>
            <span className={s.label}>Bestseller</span>
            <h3 className={`${s.cardTitel} ${s.large}`} >Poplin Top With Sleeve Bow</h3>
            <p className={`${s.cardText} ${s.large}`} >Poplin top with roll neckline, long sleeves</p>
          <NavLink to="/goods?category=Bestseller"
            onClick={()=>setFilterGood('label', "Bestseller")}
            className={s.button}>
            <span className={s.buttonText}>View All</span>
             <img src={arrow} alt="" className={s.buttonIcon}/>
            </NavLink>
          </div>
      </div>
      <div className="col-xl-3  col-lg-6 mb-4">
        <NavLink to="/goods?category=Accessories"
          onClick={()=>setFilterGood('category', "Accessories")}>
          <div className={`${s.card4} ${s.card}`}>
            <h3 className={`${s.cardTitel} ${s.textLight}`}>Printed Shirt with a Bow</h3>
            <p className={`${s.cardText} ${s.textLight}`}>Pink/Sky Blue/Yellow</p>
            <span className={s.cardPrice}>$129</span>
          </div>
      </NavLink>
      </div>
    </Row>
  );
}
export default PreviewCard;
