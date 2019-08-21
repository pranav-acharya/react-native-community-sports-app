import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_LOADING, LOGIN_LOADING, VERIFY_FAILURE, VERIFY_LOADING, VERIFY_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  signup: { status: null, error: null, loading: null },
  login: { status: null, error: null, loading: null },
  verify: { status: null, error: null, loading: null }
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_LOADING:
      return { ...state, signup: { loading: true } };

    case LOGIN_LOADING:
      return { ...state, login: { loading: true } };

    case VERIFY_LOADING:
      return { ...state, verify: { loading: true } };

    case SIGNUP_SUCCESS:
      return { ...state, signup: { status: true, error: null, loading: false } };

    case SIGNUP_FAILURE:
      return { ...state, signup: { status: false, error: action.message, loading: false } };

    case LOGIN_SUCCESS:
      return { ...state, login: { status: false, error: null, loading: false } };

    case LOGIN_FAILURE:
      return { ...state, login: { status: false, error: action.message, loading: false } };

    case VERIFY_SUCCESS:
      return { ...state, verify: { status: true, error: null, loading: false } };

    case VERIFY_FAILURE:
      return { ...state, verify: { status: false, error: action.message, loading: false } };

    default:
      return INITIAL_STATE;
  }
};

export default AuthReducer;
