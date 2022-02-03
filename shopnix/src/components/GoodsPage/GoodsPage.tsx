import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CardGood from '../CardGood/CardGood';
import { getGoodsFilterThunkCreator } from '../../store/effects';
import Paginator from '../comon/Paginator/Paginator';
import { countGoodsCart } from '../Functions/secondaryFunction';
import { connect, ConnectedProps } from 'react-redux';
import { AddDispatch, RootState} from '../../store/store'
import { IGood } from "../../models/IGood"

type MapDispatchToPropsType = {
  getGoodsFilterThunkCreator: (pageSize: number, pageNumber: number, filter: string, values: string) => void
}

type MapStateToPropsType = {
  currentPage:number
  pageSize:number
  filter:string
  values: string
  dataCartGoods: IGood[]
  cardGoods: IGood[]
  totalCount: number | null
}


type PropsType = MapDispatchToPropsType & MapStateToPropsType & GoodsPropsType

class GoodsPage extends React.Component<PropsType> {
  /* constructor(props: Readonly<PropsType>) {
    super(props);
  } */

  public onPageChanged(pageNumber:number) {
    const { pageSize, filter, values } = this.props;
    this.props.getGoodsFilterThunkCreator(pageSize, pageNumber, filter, values);
  }
  componentDidMount() {
    const { currentPage, pageSize, filter, values } = this.props;
    this.props.getGoodsFilterThunkCreator( pageSize, currentPage, filter, values);
  }
  componentDidUpdate(prevProps:any) { ///
    if (this.props.filter !== prevProps.filter ||
      this.props.values !== prevProps.values) {
      const { currentPage, pageSize, filter, values } = this.props;
      this.props.getGoodsFilterThunkCreator( pageSize, currentPage, filter, values);
    }
  }
  
  public render() {
    return (
      <Container className="special-offers  pb-4 ">
        <Row>
          {
            this.props.cardGoods.map(card =>{
              return (<CardGood
                key={card.id} 
                id={card.id}
                src={`http://localhost:3000/db/${card.img}`}  
                title={card.name}
                countGoods={countGoodsCart(this.props.dataCartGoods, card.id)}
                descreption={card.description}
                price={card.price}
                newGood={card.label}
              />)
            })
          }
        </Row>
        <Paginator currentPage={this.props.currentPage}
          totalCount={this.props.totalCount}
          pageSize={this.props.pageSize}
          onPageChanged={this.onPageChanged}
         />
      </Container>
    );
  }
}


const mapStateToProps = (state:RootState) => ({
  dataCartGoods: state.goods.dataCartGoods,
  currentPage: state.goods.currentPage,
  pageSize: state.goods.pageSize,
  filter: state.goods.filter,
  cardGoods: state.goods.goods,
  totalCount: state.goods.totalCount,
  values: state.goods.values,
})

let mapDispatchToProps = (dispatch:AddDispatch) => {
  return {
    getGoodsFilterThunkCreator: (pageSize:number, currentPage:number, filter:string, value:string) => dispatch(getGoodsFilterThunkCreator(pageSize, currentPage, filter, value)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type GoodsPropsType = ConnectedProps<typeof connector>;

export default connector(GoodsPage);
