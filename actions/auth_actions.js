import {
  LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_LOADING, SIGNUP_FAILURE, SIGNUP_SUCCESS,
  SIGNUP_LOADING, VERIFY_FAILURE, VERIFY_LOADING, VERIFY_SUCCESS
} from './types';
import { login, signup, verify } from '../api/auth';
import { setUserContext } from '../utils/appContext';

export const signupPress = ({ email, contact, password }) => async (dispatch) => {
  console.log('signing up');
  dispatch({ type: SIGNUP_LOADING });
  try {
    const response = await signup({ email, password });

    if (response.status === 200) {
      dispatch({ type: SIGNUP_SUCCESS });
    } else { dispatch({ type: SIGNUP_FAILURE, message: 'Something went wrong' }); }
  } catch (e) {
    dispatch({ type: SIGNUP_FAILURE, message: e.message });
  }
};

export const loginPress = ({ email, password }) => async (dispatch) => {
  console.log('logging in');
  dispatch({ type: LOGIN_LOADING });
  // let response = await login({ email, password});
  try {
    const response = await login({ username: email, password });

    if (response.status === 200) {
      console.log('Res', response.data);

      const user = response.data;
      setUserContext({ userId: user.userId, email, password });
      // global.userId = user.userId;

      dispatch({ type: LOGIN_SUCCESS });

    // Set the token in AsyncStorage
    } else { dispatch({ type: LOGIN_FAILURE, message: 'Something went wrong' }); }
  } catch (e) {
    dispatch({ type: LOGIN_FAILURE, message: e.message });
  }
};


export const verifyPress = code => async (dispatch) => {
  console.log('verifying');
  dispatch({ type: VERIFY_LOADING });
  // let response = await login({ email, password});
  try {
    const response = await verify(code);
    if (response.status === 200) { dispatch({ type: VERIFY_SUCCESS }); }
    // Set the token in AsyncStorage
    else { dispatch({ type: VERIFY_FAILURE, message: 'Something went wrong' }); }
  } catch (e) {
    dispatch({ type: VERIFY_FAILURE, message: e.message });
  }
};
