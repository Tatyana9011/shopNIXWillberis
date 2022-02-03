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
type ValidateFormDataType = (formData: LoginFormType, setMessage: SetMessageType, user: string | null) =>boolean | undefined

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

export function saveDataJSON(key: string, value: any) {
  try {
      window.localStorage.setItem(key, JSON.stringify(value))
      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
 // localStorage.setItem(key, JSON.stringify(data));
}

export function getDataStorage<T>(key: string) {
  try {
      const item = window.localStorage.getItem(key)
      return parseJSON(item) as T
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
    }
/*   const getStore:JSON = localStorage.getItem(name)
  return JSON.parse(getStore); */
}

export function removeDataStorage(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removeItem localStorage: `, error)
  }
  
}

export function examinationDataStorage() {
  const name = getDataStorage('name');
  const URL = getDataStorage('URL');

  if (!name || !URL) {
    return false;
  }
  return true;
}

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch (error) {
    console.log('parsing error on', { value })
    return undefined
  }
}