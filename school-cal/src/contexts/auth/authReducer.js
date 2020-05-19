/* eslint-disable */

import {
  IS_LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_WITH_GOOGLE_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE,
  SET_CURRENT_USER,
  SIGNIN_WITH_GOOGLE_FAILURE,
} from "./types"

const setIsLoading = (state, action) => {
  return {
    ...state,
    isLoading: action.payload,
  }
}
const setSignInSuccess = (state, action) => {
  return {
    ...state,
    accessToken: action.payload.accessToken,
    userProfile: action.payload.profile,
    isLoading: false,
  }
}

const setSignInFailure = (state, action) => {
  return {
    ...state,

    signInError: action.payload,
    isLoading: false,
  }
}
const setSignInWithGoogleSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
  }
}
const setSignUpSuccess = (state, action) => {
  return {
    ...state,
    accessToken: action.payload.accessToken,
    userProfile: action.payload.profile,
    isLoading: false,
  }
}

const setSignUpFailure = (state, action) => {
  return {
    ...state,
    signUpError: action.payload,
    isLoading: false,
  }
}

const setSignOutSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    signInError: null,
    signUpError: null,
    signOutError: null,
    accessToken: null,
    userProfile: null,
  }
}
const setSignOutFailure = (state, action) => {
  return {
    ...state,
    signOutError: action.payload,
  }
}
const setCurrentUser = (state, action) => {
  return {
    ...state,
    currentUser: action.payload,
  }
}
const authReducer = (state, action) => {
  switch (action.type) {
    case IS_LOADING:
      return setIsLoading(state, action)
    case SIGNIN_SUCCESS:
      return setSignInSuccess(state, action)
    case SIGNIN_FAILURE:
      return setSignInFailure(state, action)
    case SIGNIN_WITH_GOOGLE_SUCCESS:
      return setSignInWithGoogleSuccess(state, action)
    case SIGNUP_SUCCESS:
      return setSignUpSuccess(state, action)
    case SIGNUP_FAILURE:
      return setSignUpFailure(state, action)
    case SIGNOUT_SUCCESS:
      return setSignOutSuccess(state, action)
    case SIGNOUT_FAILURE:
      return setSignOutFailure(state, action)
    case SET_CURRENT_USER:
      return setCurrentUser(state, action)
    default:
      return state
  }
}

export default authReducer
