import { IGood } from './../../models/IGood';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GoodsState {
  goods: IGood[];
  currentPage: number,
  pageSize: number,
  totalCount: number | null,
  filter: string,
  values: string,
  isLoading: boolean,
  error:string,
  dataCartGoods: IGood[]
  showCart: boolean, //показывать значек корзины в шапке
  btnTopShow: boolean   //кнопка для скола показывать при покрутке в низ на 300 
}

const initialState: GoodsState = {
  goods: [],
  currentPage: 1,
  pageSize: 8,
  totalCount: null,
  filter: "",
  values: "",
  dataCartGoods: [],
  showCart: false, 
  btnTopShow: false,
  isLoading: false,
  error:'',
}

export const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    showModal: (state)=> {
      state.showCart= true
    },
    hideModal: (state) => {
      state.showCart= false
    },
    showBtn: (state) => {
      state.btnTopShow = true
    },
    hideBtn: (state) => {
      state.btnTopShow= false
    },
    addGoodCart: (state, action: PayloadAction<string>) => {
      state.dataCartGoods = state.dataCartGoods.concat(state.goods.filter(item => item.id === action.payload))
    },
    clearAllGoodsCart: (state) => {
      state.dataCartGoods = []
    },
    deleteGoodCart: (state, action: PayloadAction<string>) => {
      state.dataCartGoods = state.dataCartGoods.filter(item => item.id !== action.payload)
    },
    decrementGoodCart: (state, action: PayloadAction<string>) => {
      const index = state.dataCartGoods.findIndex(n => n.id === action.payload);
      state.dataCartGoods = state.dataCartGoods.filter((item, i) => i !== index) 
    },
    setFilterGoodsData: (state, action: PayloadAction<string>) => {
      state.filter = action.payload 
    },
    setValueGoodsData: (state, action: PayloadAction<string>) => {
      state.values = action.payload //.values;
    },
    setCurrentPage: (state, action: PayloadAction<number>)=>{
      state.currentPage=action.payload
    },
    goodsFetching(state) {
      state.isLoading = true
    },
    goodsFetchingSuccess(state,action: PayloadAction<IGood[]>) {
      state.isLoading = false
      state.error = ''
      state.goods = action.payload
    },
    goodsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    getTotalCount(state, action: PayloadAction<string>) {
      state.totalCount=+action.payload
    }

  }
})
export const { showModal,
hideModal,
showBtn,
hideBtn,
addGoodCart,
clearAllGoodsCart,
deleteGoodCart,
decrementGoodCart,
setFilterGoodsData,
setCurrentPage,
goodsFetching,
goodsFetchingSuccess,
  goodsFetchingError,
  getTotalCount,
setValueGoodsData
} = goodsSlice.actions

export default goodsSlice.reducer;