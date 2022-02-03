import React from 'react';
import s from './Cart.module.css';
import Cart from './Cart';
import { connect } from 'react-redux';
import {
  addGoodCart,
  decrementGoodCart,
  showModal, hideModal,
  deleteGoodCart, clearAllGoodsCart
} from '../../store/reducers/GoodsSlice';
import { AddDispatch, AddSelector } from '../../store/store';
import { IGood } from "../../models/IGood"

type PropsType = {
  showCart:boolean
  dataCartGoods:IGood[]
  increment: (id:string)=>void
  decrement:(id:string)=>void
  hideModal:()=>void
  showModal:()=>void
  clearAllGoodsCart:()=>void
  deleteGoodCart:(id:string)=>void
}

const CartContainer:React.FC<PropsType> = (props) => {
  const setData = new Set(props.dataCartGoods);

  const totalPrice: number = props.dataCartGoods.reduce((sum, item) => {
    return sum + parseInt(item.price);
  }, 0);
    

  const escapeHandler=(event: React.KeyboardEvent)=> {
    if (event.code === 'Escape') {
      props.hideModal();
    }
  }
  const closeModal = (event:any) => {
    if (!event.target.closest(`.${s.modal}`)) {
      props.hideModal();
    }
  };

  return (
    <div onClick={closeModal} onKeyPress={escapeHandler} className={`${s.overlay} ${props.showCart ? s.show : ''}`}>
      <Cart
        increment ={props.increment}
        decrement={props.decrement}
        deleteGoodCart={props.deleteGoodCart}
        dataCartGoods={props.dataCartGoods}
        setData={setData}
        hideModalProps={props.hideModal}
        clearAllGoodsCart={props.clearAllGoodsCart}
        totalPrice={totalPrice}
      />
    </div >
  )
}

const mapStateToProps = (state:AddSelector) => ({
  showCart: state.goods.showCart,
  dataCartGoods: state.goods.dataCartGoods,
});

let mapDispatchToProps = (dispatch:AddDispatch) => {
  return {
    increment: (id:string) => { dispatch(addGoodCart(id)) },
    decrement: (id:string) => { dispatch(decrementGoodCart(id)) },
    hideModal: () => { dispatch(hideModal()) },
    showModal: () => { dispatch(showModal()) },
    clearAllGoodsCart: () => { dispatch(clearAllGoodsCart()) },
    deleteGoodCart: (id:string) => { dispatch(deleteGoodCart(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);

