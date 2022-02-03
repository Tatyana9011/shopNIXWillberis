import React from 'react';
import { Nav } from 'react-bootstrap';
import s from './CardGood.module.css';
import CartBtn from '../Cart/CartBtn';
import { goodsSlice } from '../../store/reducers/GoodsSlice';
import { useAppDispatch } from '../../hook/redux';

type PropsType = {
  id: string
  src: string
  title: string
  descreption: string
  price: string
  newGood: string
  countGoods: number
}

const CardGood: React.FC<PropsType> = (props) => {
  const { addGoodCart } = goodsSlice.actions;
  const dispatch = useAppDispatch()

  return (
    <div className="col-lg-3 col-sm-6" >
      <Nav.Link className={s.goodsCard}>
        <div className={s.labelGoodsCard}>
          {(props.newGood !== '') ? <span className={s.label}>{props.newGood} </span> : ''}
          <div>
            <CartBtn count={props.countGoods} addClass={'goodCart'} id={props.id} />
          </div>
        </div>
        <img src={props.src} alt={`image: ${props.title}`} className={s.goodsImage} />
        <h3 onClick={()=>dispatch(addGoodCart(props.id))} className={s.goodsTitle}> {props.title} </h3>
        <p className={s.goodsDescreption} onClick={()=>dispatch(addGoodCart(props.id))} >{props.descreption}</p>
        <span onClick={()=>dispatch(addGoodCart(props.id))} className={s.goodsPrice}>${props.price}</span>
      </Nav.Link>
    </div>);
}

export default CardGood;
