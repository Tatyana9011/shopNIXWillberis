import { authAPI, goodsAPI } from '../api/api';
import {
  goodsFetching,
  goodsFetchingSuccess,
  goodsFetchingError,setCurrentPage,getTotalCount
} from "./reducers/GoodsSlice";
import {
  usersFetching,
  usersFetchingSuccess,
  setLoginIn,
  setMessage,
  usersFetchingError,
} from "./reducers/UserSlice"
import { saveDataJSON, removeDataStorage } from '../components/Functions/secondaryFunction';
import { AddDispatch } from './store';


export const loginThunkCreator = (pass:string, login:string) => async (dispatch:AddDispatch) => {
  try {
    dispatch(usersFetching());
    let response = await authAPI.login(pass, login);
    setTimeout(() => {
      if (response.statusText === 'OK') {
        saveDataJSON('pass', response.data[0].pass);
        saveDataJSON('login', response.data[0].login);
        dispatch(usersFetchingSuccess([
          {
            id: response.data[0].id,
            login: response.data[0].login,
            pass: response.data[0].pass,
          }
        ]));
        dispatch(setLoginIn(true))
      }
    }, 500);//делаем задержку что бы было видно прилооудер
  } catch (e:any) {
    dispatch(usersFetchingError(e));
  }
}

export const userGetThunkCreator = (pass:string, login:string) => async (dispatch:AddDispatch) => {
  try {
    dispatch(usersFetching());
    let response = await authAPI.login(pass, login);
    setTimeout(() => {
      if (response.statusText === 'OK') {
        if (response.data[0]) {
          dispatch(usersFetchingSuccess([
            {
              id: response.data[0].id,
              login: response.data[0].login,
              pass: response.data[0].pass,
            }
          ]));
          dispatch(setLoginIn(false))
          setTimeout(() => {
            dispatch(setMessage('Вы успешно авторизированны'));
          }, 1000);
          setTimeout(() => {
            dispatch(setMessage(''));
          }, 4000);
        }
      } 
    }, 500);//делаем задержку что бы было видно прилооудер
  } catch (e:any) {
    dispatch(usersFetchingError(e));
  }
};

export const authorizationThunkCreator = (email:string, pass:string, login:string) => async (dispatch:AddDispatch) => {
  try {
    dispatch(usersFetching());
    let response = await authAPI.authorization(email, pass, login);
    if (response.statusText === 'Created') {
      dispatch(loginThunkCreator(pass, login));
    }
  } catch (e:any) {
    dispatch(usersFetchingError(e));  //e.message
  }
}

export const loginOutThunkCreator = (id:string) => async (dispatch:AddDispatch) => {
  try {
    dispatch(usersFetching());
    let response = await authAPI.loginOut(id);
    if (response.statusText === 'OK') {
      removeDataStorage('login');
      removeDataStorage('pass');
      dispatch(usersFetchingSuccess([
        {
          id: null,
          login: null,
          pass: null,
          email: null,
        }]));
      dispatch(setLoginIn(false))
    }
  } catch (e:any) {
    dispatch(usersFetchingError(e));  //e.message
  }
}

export const getGoodsFilterThunkCreator = (pageSize:number, page:number, filter:string, value:string) => async (dispatch:AddDispatch) => {
   try {
    dispatch(setCurrentPage(page));
    dispatch(goodsFetching());
     let response = await goodsAPI.goodsPageFilterAPI(pageSize, page, filter, value);
    setTimeout(() => {
      if (response.statusText === 'OK') {
        dispatch(goodsFetchingSuccess(response.data));
        dispatch(getTotalCount(response.headers['x-total-count']))
      }
    }, 500);  //делаем задержку что бы было видно прилооудер
  } catch (e:any) {
    dispatch(goodsFetchingError(e));  //e.message
  }
}

