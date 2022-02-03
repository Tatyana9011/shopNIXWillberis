import { Col } from 'react-bootstrap';
import arrow from '../../../../../img/arrow.svg';
import s from '../../CardWrap.module.css';
import {NavLink} from 'react-router-dom';
import { useAppDispatch } from '../../../../../hook/redux';
import { setFilterGoodsData, setValueGoodsData } from "../../../../../store/reducers/GoodsSlice";

type PropsType = {
  classWrap:string
  classh3:string
  textH3:string
  classP:string
  textP:string
  navLink:string
  filter:string
  values:string
}

const Card:React.FC<PropsType> = ({ classWrap, classh3, textH3, classP, textP, navLink, filter, values })=> {
  const dispatch = useAppDispatch();
  
  const setFilterGood = () =>{
     dispatch(setFilterGoodsData(filter))
     dispatch(setValueGoodsData(values))
  }
  return (
    <Col xl={6}>
      <div className={classWrap}>
        <h3 className={ classh3 }>{textH3}</h3>
        <p className={classP}>{textP}</p>
        <NavLink to={navLink} className={s.button} onClick={setFilterGood}>
          <span className={s.buttonText}>View all</span>
          <img src={arrow} alt="" className={s.buttonIcon}/>
        </NavLink>
      </div>
    </Col>
  );
}
export default Card;
