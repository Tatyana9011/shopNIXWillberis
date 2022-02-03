import { IGood } from './../models/IGood';
import { IUser } from './../models/IUser';
import axios from 'axios';

//--no-cors
const instance = axios.create({
  baseURL: 'http://localhost:5050',
});

export const authAPI = {
  login(pass:string, login:string) {
    return (
      instance.get<IUser[]>(`/users?login=${login}&pass=${pass}`)
    );
  },
  
  loginOut(id:string) {
    return instance.delete(`/users/${id}`);
  },

  authorization(email:string, pass:string, login:string) {
    return instance.post<IUser[]>(`/users`, {
      email: email,
      login: login,
      pass: pass,
    });
  },
}

export const goodsAPI = {
  goodsAll(pageSize:number, page:number) { 
    return instance.get<IGood[]>(`/goods?_page=${page}&_limit=${pageSize}`);
  },
  goodsPageFilterAPI(pageSize:number, page:number, filter:string, value:string) {
    return instance.get<IGood[]>(`/goods?${filter}=${value}&_page=${page}&_limit=${pageSize}`);
  },
}