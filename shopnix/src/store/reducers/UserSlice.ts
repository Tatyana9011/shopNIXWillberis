import { IUser } from './../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UsersState {
  users: IUser[];
  isLoading: boolean;
  error: string;
  message: string
  errorStyle: {color:string};
  btnDisplayNone: boolean,
  loginIn:boolean
}

const initialState: UsersState = {
  users: [{
    id:  null,
    login: null,
    pass: null,
    email: null,
  }],
  loginIn:false,
  isLoading: false,
  error: '',
  message: '',
  errorStyle: {color: ''},
  btnDisplayNone: false,
}

export const authSlice = createSlice({
  name: "isAuth",
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true
    },
    usersFetchingSuccess(state,action: PayloadAction<IUser[]>) { //setUserdata
      state.isLoading = false
      state.error = ''
      state.users = action.payload
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
      state.errorStyle = {color: 'red'}
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload
      state.errorStyle = {color: 'green'}
    },
    setLoginIn(state,action: PayloadAction<boolean>) {
      state.loginIn=action.payload
    },
    setBtnToglHeaderLogin(state, action: PayloadAction<boolean>) {
      state.btnDisplayNone=action.payload
    }
  }, 
  /*при использовании тулкит  в редюсер эти методы не пишем
   extraReducers: {    //этот способ предоставляет тулкит для асинхронных запросов (вместо диспатча в учную тулкит делает все сам)
    [fetchUsers.fulfilled.type]: (state,action: PayloadAction<IUser[]>) { //setUserdata
      state.isLoading = false
      state.error = ''
      state.users = action.payload
    },
    [fetchUsers.pending.type]:(state) {
      state.isLoading = true
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
      state.errorStyle = {color: 'red'}
    }

  } */
})

export const { usersFetching, usersFetchingSuccess,
  usersFetchingError, setMessage,
  setLoginIn, setBtnToglHeaderLogin
} = authSlice.actions


export default authSlice.reducer;

