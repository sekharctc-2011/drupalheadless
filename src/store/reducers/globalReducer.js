import * as actionTypes from "../actions/actionTypes"
//import { updateObject } from "./utility"

const globalState = {
  loggedIn: Boolean(localStorage.getItem("drupalauth")),
  flashMessages: [],
  user: JSON.parse(localStorage.getItem("drupalauth")),
  apiToken: "apitoken",
  isSearchOpen: false,
  login_error: false,
}

const reducer = (state = globalState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      // let newstate = [...state, action.payload]
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        apiToken: null,
        login_error: false,
      }
    // return updateObject(state, {put any object})
    case actionTypes.FETCH_LOGIN_FAILED:
      return {
        ...state,
        user: null,
        loggedIn: false,
        apiToken: null,
        login_error: true,
      }
    case actionTypes.LOG_OUT:
      return {
        ...state,
        user: null,
        loggedIn: false,
        login_error: false,
      }
    case actionTypes.FLASH_MESSAGES:
      return {}
    case actionTypes.OPEN_SEARCH:
      return {}
    case actionTypes.CLOSE_SEARCH:
      return {}
    default:
      return state
  }
}

export default reducer
