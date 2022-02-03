import React from 'react';
import s from './Cart.module.css';

type PropsType = {
  increment: (id:string)=>void
  decrement:(id:string)=>void
  deleteGoodCart: (id: string) => void
  count: number
  price: string
  name: string
  id:string
}

const RowGoodCart:React.FC<PropsType> = ({ id,
  increment, decrement,
  deleteGoodCart,
  count, price,
  name }) => {

  return (
    <tr className={s.cartItem} data-id="003">
      <td>{name}</td>
      <td>{price}$</td>
      <td><button onClick={() => decrement(id)} className={s.cartBtnMinus}>-</button></td>
      <td>{count}</td>
      <td><button onClick={() => increment(id)} className={s.cartBtnPlus}>+</button></td>
      <td>{+price * count}$</td>
      <td><button onClick={() => deleteGoodCart(id)} className={s.cartBtnDelete}>x</button></td>
    </tr>
  )
}

export default RowGoodCart;