
import React from 'react';
import { connect } from 'react-redux';
import Head from './Head';
import { showModal, setFilterGoodsData, setValueGoodsData } from '../../store/reducers/GoodsSlice';
import { IGood } from '../../models/IGood';
import { AddSelector, AddDispatch } from '../../store/store';


type PropsType = {
  btnDisplayNone: boolean
  loginIn: boolean
  dataCartGoods: IGood[]
  showCart: boolean
  showModal: () => void
  setFilterGoodsData: (filter: string) => void
  setValueGoodsData: (values: string)=>void
}

const HeadContainer:React.FC<PropsType> = (props) => {

  return (
    <div>
      <Head
        btnDisplayNone={props.btnDisplayNone}
        loginIn={props.loginIn}
        showModal={props.showModal}
        count={props.dataCartGoods.length}
        showCart={props.showCart}
        setFilterGoodsData={props.setFilterGoodsData}
        setValueGoodsData={props.setValueGoodsData}
      />
    </div>)

}

const mapStateToProps = (state:AddSelector) => ({
  btnDisplayNone: state.isAuth.btnDisplayNone,
  loginIn: state.isAuth.loginIn,
  dataCartGoods: state.goods.dataCartGoods,
  showCart: state.goods.showCart,
  values: state.goods.values,
});

const mapDispatchToProps = (dispatch:AddDispatch) => {
  return {
    showModal: () => dispatch(showModal()),
    setFilterGoodsData: (filter: string ) => dispatch(setFilterGoodsData(filter)),
    setValueGoodsData:(values: string)=>dispatch(setValueGoodsData(values))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadContainer)
