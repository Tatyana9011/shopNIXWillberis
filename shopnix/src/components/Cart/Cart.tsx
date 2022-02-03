import React from 'react';
import s from './Cart.module.css';
import { IGood } from "../../models/IGood"
import RowGoodCart from "./RowGoodCart"

type PropsType = {
  setData: Set<IGood>
  hideModalProps:()=>void
  clearAllGoodsCart:()=>void
  totalPrice: number
  dataCartGoods: IGood[]
  increment: (id:string)=>void
  decrement:(id:string)=>void
  deleteGoodCart:(id:string)=>void

}

const Cart: React.FC<PropsType> = ({ increment, decrement,
  deleteGoodCart, setData, hideModalProps,
  clearAllGoodsCart, totalPrice, dataCartGoods }) => {

  let arrReactNode:React.ReactNode[] = [];
  setData.forEach((item:IGood)=> {
             arrReactNode.push(<RowGoodCart
                    key={`cart ${item.id}`}
                    increment={increment}
                    decrement={decrement}
                    deleteGoodCart={deleteGoodCart}
                    price={item.price}
                    name={item.name}
                    count={goodCount(dataCartGoods, item.id)}
                    id={item.id}
              />)

              })

  
  const goodCount: (data:IGood[], id:string)=>number = (data, id) => {
    let count:number = 0;
    data.forEach(item => {
      if (item.id === id) {
        count++;
      }
    });
    return count;
  };

  return (
    <div className={s.modal} >
      <header className={s.modalHeader}>
        <h2 className={s.modalTitle}>Cart</h2>
        {setData.size ? <button onClick={()=>clearAllGoodsCart()} className={`${s.button} ${s.clearTable}`} >Clear oll</button> : ''}
        <button onClick={()=>hideModalProps()} className={s.modalClose}>x</button>
      </header>
      {setData.size ?
        <table className={s.cartTable}>
          <colgroup>
            <col className={s.colGoods} />
            <col className={s.colPrice} />
            <col className={s.colMinus} />
            <col className={s.colQty} />
            <col className={s.colPlus} />
            <col className={s.colTotalPrice} />
            <col className={s.colDelete} />
          </colgroup>
          <thead>
            <tr>
              <th>Good(s)</th>
              <th>Price</th>
              <th className = "col-3">Qty.</th>
              <th className = "col-2">Total</th>
            </tr>
          </thead>
          <tbody className={s.cartTableGoods}>
            {
              arrReactNode
            }
          </tbody>
          <tfoot>
            <tr>
              <th className="col-5">Total:</th>
              <th className={`${s.cardTableTotal} col-2`} >{totalPrice}$</th>
            </tr>
          </tfoot>
        </table>
        : <p>no products yet</p>}
      {setData.size ?
        <form className={s.modalForm} action="">
          <input className={s.modalInput} type="text" placeholder="Имя" name="nameCustomer" />
          <input className={s.modalInput} type="text" placeholder="Телефон" name="phoneCustomer" />
          <button className={`${s.button} ${s.cartBuy}`}>
            <span className={s.buttonText}>Checkout</span>
          </button>
        </form>
        : ''}
    </div>

  )
}

export default Cart;