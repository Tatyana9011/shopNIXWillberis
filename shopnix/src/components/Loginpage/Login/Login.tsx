import React from 'react';
import LoginReduxForm from './LoginForm';
import { connect } from 'react-redux';
import {
  loginThunkCreator,
  authorizationThunkCreator,
  loginOutThunkCreator,
  userGetThunkCreator
} from '../../../store/effects';
import {
  usersFetchingSuccess,setBtnToglHeaderLogin,
  setMessage,
  setLoginIn
} from '../../../store/reducers/UserSlice';
import {setFilterGoodsData, setValueGoodsData} from '../../../store/reducers/GoodsSlice';
import { validateFormData, removeDataStorage } from '../../Functions/secondaryFunction';
import {AddDispatch, AddSelector} from '../../../store/store'
import {IUser} from '../../../models/IUser'
import { LoginFormType } from '../../../store/types';

type MapStateToPropsType = {
  loginIn: boolean
  message: string
  error: string
  errorStyle: { color: string }
  isLoading: boolean
  id?: string | null
  login: string | null
}
type MapDispatchToPropsType = {
  loginThunkCreator: (pass:string, login:string) => void
  authorizationThunkCreator: (email:string, pass:string, login:string) => void
  loginOutThunkCreator: (id:string) => void
  usersFetchingSuccess: (payload:IUser[]) => void
  userGetThunkCreator: (pass:string, login:string) => void
  setMessage: (message:string) => void
  setFilterGoodsData: (filter:string ) => void
  setValueGoodsData:(value:string)=> void
  setLoginIn: (loginIn:boolean) => void
  setBtnToglHeaderLogin:(btn:boolean)=> void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

type StateType = {
  editMode: boolean
  loginOut: boolean
  formData?: LoginFormType
}

class Login extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  state:StateType = {
    editMode: false,  // клиент хочет автоизироватся(true) или залогинится(false)
    loginOut: false, //клиент хочет удалить свои данные с базы данных(true)
    formData: undefined
  }

  setStateEditMode() {
    this.setState({
          editMode: true
    })
  }

  componentDidMount() { //пришли на станицу
    this.props.setBtnToglHeaderLogin(true);
  }
  componentWillUnmount() { //ушли со страницы
    this.props.setBtnToglHeaderLogin(false);
    this.setState({
          editMode: false
      });
  }

  componentDidUpdate(prevProps:PropsType, prevState:StateType) {
    if (this.state.formData !== prevState.formData && this.state.formData !== undefined) {
      const {formData} = this.state
        setTimeout(() => {
          if (validateFormData(formData, this.props.setMessage, this.props.login)) {
            if (this.state.editMode && formData) {
              this.props.authorizationThunkCreator(formData.email, formData.pass, formData.login);
            } else {
              this.props.loginThunkCreator(formData.pass, formData.login);
            }
        }
      }, 1000);
    }
    

    if (this.state.loginOut !== prevState.loginOut && this.props.id) {
      this.props.loginOutThunkCreator(this.props.id);
    }

  }

  handleSubmit(formData: LoginFormType) {
    this.setState({
      formData: formData
    });
    this.props.userGetThunkCreator(formData.pass, formData.login); //есть пользователь или нету
  }

  onClick(){
    removeDataStorage('login');
    removeDataStorage('pass');
    this.props.usersFetchingSuccess([
        {
          id: null,
          login: null,
          pass: null,
          email: null,
      }]);
    this.props.setLoginIn(false);
  }

  render() {
    return (
      <div>
        <LoginReduxForm
          onSubmit={this.handleSubmit}
          editMode={this.state.editMode}
          loginIn={this.props.loginIn}
          message={this.props.message}
          errorStyle={this.props.errorStyle}
          setLoginIn={this.props.setLoginIn} //меняем значение liginIn :false
          removeUserData={this.onClick}
          setFilterGoodsData={this.props.setFilterGoodsData}
          setValueGoodsData={this.props.setValueGoodsData}
          setStateEditMode={this.setStateEditMode}
        />
        
      </div>
    )
  }
}

const mapStateToProps = (state:AddSelector): MapStateToPropsType=> ({
  loginIn: state.isAuth.loginIn,
  message: state.isAuth.message,
  error: state.isAuth.error,
  errorStyle: state.isAuth.errorStyle,
  isLoading: state.isAuth.isLoading,
  id: state.isAuth.users[0].id,
  login: state.isAuth.users[0].login,
})

const mapDispatchToProps = (dispatch:AddDispatch): MapDispatchToPropsType => {
  return {
    usersFetchingSuccess: (payload:IUser[]) => dispatch(usersFetchingSuccess(payload)),
    setMessage: (message:string) => dispatch(setMessage(message)),
    setFilterGoodsData: (filter:string ) => dispatch(setFilterGoodsData(filter)),
    setValueGoodsData:(value:string)=> dispatch(setValueGoodsData(value)),
    setLoginIn: (loginIn:boolean) => dispatch(setLoginIn(loginIn)),
    setBtnToglHeaderLogin: (btn: boolean) => dispatch(setBtnToglHeaderLogin(btn)),
    userGetThunkCreator: (pass: string, login: string) => dispatch(userGetThunkCreator(pass, login)),
    loginOutThunkCreator: (id: string) => dispatch(loginOutThunkCreator(id)),
    loginThunkCreator: (pass: string, login: string) => dispatch(loginThunkCreator(pass, login)),
    authorizationThunkCreator: (email:string, pass:string, login:string) => dispatch(authorizationThunkCreator(email, pass, login)),
    }
}

//<MapStateToPropsType, MapDispatchToPropsType,AddSelector>
export default connect(mapStateToProps,mapDispatchToProps)(Login)
