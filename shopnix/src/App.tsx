import React from 'react'
import { AddDispatch,store } from './store/store';
import { BrowserRouter, Route} from "react-router-dom";
import {  RouteComponentProps, withRouter, Redirect, Switch } from 'react-router';
import Footer from "./components/Footer/Footer";
import HeadContainer from "./components/Head/HeadContainer";
import { compose } from 'redux';
import Homepage from './components/Homepage/Homepage';
import { Provider, connect } from 'react-redux';
import GoodsPage from "./components/GoodsPage/GoodsPage";
import Login from "./components/Loginpage/Login/Login";
import { loginThunkCreator } from './store/effects';
import { showBtn, hideBtn, hideModal } from './store/reducers/GoodsSlice';
import { usersFetchingSuccess, setLoginIn } from './store/reducers/UserSlice';
import CartContainer from './components/Cart/CartContainer';
import TopButton from './components/TopButton/TopButton';
import { getDataStorage } from './components/Functions/secondaryFunction';
import { IUser } from './models/IUser';

type MyPropsType = {
    showBtn: () => void,
    hideBtn: () => void
    hideModal: () => void
    usersFetchingSuccess: (payload:IUser[]) => void
    setLoginIn:(payload:boolean)=>void
    loginThunkCreator: (login:string, pass:string) => void
};

class App extends React.Component <MyPropsType&RouteComponentProps>{
  constructor(props: MyPropsType&RouteComponentProps) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    if (window.pageYOffset >= 300) {
      this.props.showBtn();
    } else {
      this.props.hideBtn();
    }
  }

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    console.log("catchAllUnhandledErrors ....some error occured");
    //нужна санка и в апп-редьюсер добавить глобальную ошибку и диспачить санку
  }

  componentDidMount() {
    const pass:string | undefined = getDataStorage('pass');
    const login:string | undefined = getDataStorage('login');
    if (pass && login) {
      this.props.loginThunkCreator(login, pass);
    } else {
      const users = [{
        id:  null,
        login: null,
        pass: null,
        email: null,
      }]
      this.props.usersFetchingSuccess(users);
      this.props.setLoginIn(false)
    }

    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    return (
      <BrowserRouter>
        <HeadContainer />
        <Switch>
          <Route exact path='/' render={() => <Redirect to={'/home'} />} />
          <Route path='/home' render={() => < Homepage />} />
          <Route path='/login' render={() => <Login/>} />
          <Route path='/goods/:category?' render={()=><GoodsPage/>} />
          <Route path='/*' render={() => <div> 404 NOT FOUND</div>} />
        </Switch>
        <Footer />
        <CartContainer />
        <TopButton />
      </BrowserRouter >
    )
  }
};


let mapDispatchToProps = (dispatch: AddDispatch) => {
  return {
    showBtn: () => dispatch(showBtn()),
    hideBtn: () => dispatch(hideBtn()),
    hideModal: () => dispatch(hideModal()),
    usersFetchingSuccess: (payload:IUser[]) => dispatch(usersFetchingSuccess(payload)),
    setLoginIn:(payload:boolean)=>dispatch(setLoginIn(payload)),
    loginThunkCreator: (login:string, pass:string) => dispatch(loginThunkCreator(login, pass))
  }
}

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapDispatchToProps)
)(App)

const NixShop: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default NixShop;