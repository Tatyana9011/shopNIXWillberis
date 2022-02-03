import React from 'react';
import s from './Cart.module.css';
import cart from '../../img/cart.svg';
import { decrementGoodCart, addGoodCart } from '../../store/reducers/GoodsSlice';
import {useAppDispatch} from '../../hook/redux'

type PropsType = {
  showModal?:()=>void
  count: number
  addClass:string
  id: string | null
}

const CartBtn:React.FC<PropsType> = ({ showModal, count, addClass, id }) => {

  const dispatch = useAppDispatch();
  if (id) {
    return (
    <div
      className={`${s.button} ${addClass === 'cart' ? s.cart : addClass === 'goodCart' ? s.goodCart : ''}`}>
      {count > 0 ? <div className={s.increment} onClick={() => dispatch(decrementGoodCart(id))}></div> : ''}
            <img onClick={() => dispatch(addGoodCart(id))} className={s.buttonIcon} src={cart} alt="icon: cart" />
            <span className={`${s.buttonText} ${s.cartCount}`}>{count > 0 ? count : ''}</span>
     </div>
    )
  }
    return (
    <div onClick={showModal}
      className={`${s.button} ${addClass === 'cart' ? s.cart : addClass === 'goodCart' ? s.goodCart : ''}`}>
      {count > 0 ? <div className={s.increment}></div> : ''}
            <img className={s.buttonIcon} src={cart} alt="icon: cart" />
            <span className={`${s.buttonText} ${s.cartCount}`}>{count > 0 ? count : ''}</span>
     </div>
    )
  
}
export default CartBtn;