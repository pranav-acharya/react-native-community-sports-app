import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_LOADING, SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_LOADING } from './types';
import { login, signup } from '../api/auth';
import axios from 'axios';

export const signupPress = ({ email, contact, password }) => async dispatch => {
  console.log('signing up')
  dispatch({ type: SIGNUP_LOADING });
  try {
    let response = await signup({ email, password });

    if(response.status == 200)
      dispatch({ type: SIGNUP_SUCCESS });
    else
      dispatch({ type: SIGNUP_FAILURE, message: 'Something went wrong' });
  } catch (e) {
    dispatch({ type: SIGNUP_FAILURE, message: e.message });
  }
};

export const loginPress = ({ email, password }) => async dispatch => {
  console.log('logging in');
  dispatch({ type: LOGIN_LOADING });
  // let response = await login({ email, password});
  try {
    let response = await login({ email, password });

    if(response.status == 200)
      dispatch({ type: LOGIN_SUCCESS });
      // Set the token in AsyncStorage
    else
      dispatch({ type: LOGIN_FAILURE, message: 'Something went wrong' });
  } catch (e) {
    dispatch({ type: LOGIN_FAILURE, message: e.message });
  }
  
};