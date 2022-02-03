import React from 'react';
import { Container, Row, Nav } from 'react-bootstrap';
import CardGood from '../../CardGood/CardGood';
import s from './CardWrap.module.css';
import PreviewCard from './PreviewCard/PreviewCard';
import { countGoodsCart } from '../../Functions/secondaryFunction';
import { getGoodsFilterThunkCreator } from '../../../store/effects';
import { setFilterGoodsData, setValueGoodsData } from '../../../store/reducers/GoodsSlice';
import { connect } from 'react-redux';
import { AddDispatch, AddSelector } from '../../../store/store';
import { IGood } from '../../../models/IGood';

type PropsType = {
  filter: string
  values: string
  cardGoods: IGood[]
  totalCount: number | null
  dataCartGoods: IGood[]
  setFilterGoodsData: (filter:string) => void
  setValueGoodsData: (values:string) => void
  getGoodsFilterThunkCreator: (pageSize:number, page:number, filter:string, value:string) => void
  countGoodsCart:  (dataCart:IGood[], id:string) => number
}

class CardWrap extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.viewOllNewGoods = this.viewOllNewGoods.bind(this);
  }

  componentDidMount() {
    const {filter, values } = this.props;
    this.props.setFilterGoodsData('label');
    this.props.setValueGoodsData("New")
    this.props.getGoodsFilterThunkCreator(4, 1, filter, values);
  }

  viewOllNewGoods() {
    let { filter, values, totalCount } = this.props;
    if (totalCount === null) totalCount = 10;
    this.props.getGoodsFilterThunkCreator(totalCount, 0, filter, values);
  }

    render() {
      return (
        <Container className="special-offers pt-5 pb-4 ">
          <PreviewCard />
          <Row className="align-items-center mb-4 mt-4">
            <div className="col-9">
              <h2 className={s.sectionTitle}>New Arrival</h2>
            </div>
            <div className="col-3 d-flex justify-content-end">
              <Nav.Link onClick={this.viewOllNewGoods} className={s.linkMore} >View All</Nav.Link>
            </div>
          </Row>
          <Row>
            {
              this.props.cardGoods.map(cardGood => {
                return (
                  <CardGood id={cardGood.id} key={`${cardGood.id}`} src={`http://localhost:3000/db/${cardGood.img}`}
                    title={cardGood.name} countGoods={this.props.countGoodsCart(this.props.dataCartGoods, cardGood.id)}
                    descreption={cardGood.description} price={cardGood.price} newGood={cardGood.label} />
                );
              })
            }
          </Row>
        </Container>)
    }
}

const mapStateToProps = (state:AddSelector) => ({
  cardGoods: state.goods.goods,
  totalCount: state.goods.totalCount,
  dataCartGoods: state.goods.dataCartGoods,
  filter: state.goods.filter,
  values: state.goods.values,
});

const mapDispatchToProps = (dispatch:AddDispatch) => {
  return {
    setFilterGoodsData: (filter:string) => dispatch(setFilterGoodsData(filter)),
    setValueGoodsData: (values:string) => dispatch(setValueGoodsData(values)),
    getGoodsFilterThunkCreator: (pageSize:number, page:number, filter:string, value:string) => dispatch(getGoodsFilterThunkCreator(pageSize, page, filter, value)),
    countGoodsCart:  (dataCart:IGood[], id:string) => countGoodsCart(dataCart, id)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardWrap);
