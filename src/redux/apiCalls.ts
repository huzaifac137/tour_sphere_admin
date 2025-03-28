import axios from 'axios';
import { toast } from 'react-toastify';
import { serverLink } from '../server/server';
import { Failure, isLoginSuccess, Start } from './slices/adminSlice';

export const Login = async (dispatch: Function, data: Object) => {
  dispatch(Start());
  try {
    const res = await axios.post(`${serverLink}api/v1/admin-ki-apis/login`, data);
     
    if (res.data && res.data.token && res.data.adminId) {
      dispatch(isLoginSuccess(res.data));
     
    }
    
  } catch (error) {
    dispatch(Failure(error.response?.data.message));
    toast.error('Invalid Credentials', {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log('error');
  }
};
