import { React } from 'react';
import { LoginFormType } from './../../store/types';
import { IGood } from './../../models/IGood';
export const convertToPrice = (price:string) => {
 // return price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });
};

export const totalPriceItems = (order:any) => {
  /* const countTopping = order.topping && order.topping.filter(item => item.checked).length;
  const priceTopping = (order.price * 0.1) * countTopping;
  return (order.price + priceTopping) * order.count; */
};
type SetMessageType = (payload:string)=>void
type ValidateFormDataType = (formData: LoginFormType, setMessage: SetMessageType, user: string | null) =>void

export const validateFormData:ValidateFormDataType = (formData, setMessage, user) => {
  if (formData.email && formData.pass && formData.pass2 && formData.login) {
    if (formData.pass !== formData.pass2) {
      setMessage('Пароли не совпадают');
      return false;
    }
    if (user !== null) {
      setMessage('Пользователь с таким логином или паролем уже существует!');
      return false;
    }
    if (!formData.pass.trim() || !formData.login.trim()) {
      setMessage('Поле с логином или паролем не может быть пустым');
      return false;
    }
    return true;
  } else if (formData.pass && formData.login && !formData.email && !formData.pass2) {
    if (!formData.pass.trim() || !formData.login.trim()) {
      setMessage('Поле с логином или паролем не может быть пустым');
      return false;
    }
    if (user === null) {
      setMessage('Пользователь не найден');
      return false;
    }
    return true;
  }
}

export const countGoodsCart = (data:IGood[], id:string) => {
  let count = 0;
  if (data.length) {
    data.filter(item => {
      if (+item.id === +id) {
        count++;
      }
    });
  }
  return count;
}

export function saveDataJSON(name:string, data:any) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getDataStorage(name: string) {
  const getStore:JSON = localStorage.getItem(name)
  return JSON.parse(getStore);
}

export function removeDataStorage(name:string) {
  localStorage.removeItem(name);
}

export function examinationDataStorage() {
  const name = getDataStorage('name');
  const URL = getDataStorage('URL');

  if (!name || !URL) {
    return false;
  }
  return true;
}