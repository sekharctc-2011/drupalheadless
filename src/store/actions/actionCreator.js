import * as actionTypes from "./actionTypes"
import { formatBasicAuth } from "./../reducers/utility"

import Axios from "axios"

export const LogIn = (data) => {
  return {
    type: actionTypes.LOGIN,
    payload: data,
  }
}

export const FetchLoginFailed = () => {
  return {
    type: actionTypes.FETCH_LOGIN_FAILED,
  }
}

export const DoLogOut = () => {
  return {
    type: actionTypes.LOG_OUT,
  }
}

/**
 *
 * Handle log_out middileWare
 */

export const SetLogOut = () => {
  return async (dispatch, getState) => {
    const logout_token = getState().user.logout_token
    const csrfToken = getState().user.csrf_token

    console.log("Logout Token :-" + logout_token)
    console.log("CSRF Token :-" + csrfToken)
    try {
      const userlogout = await Axios.post(
        "/user/logout?_format=json&token=" + logout_token,
        {},
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded", "X-CSRF-Token": csrfToken },
        }
      )

      if (userlogout.status == 204) {
        localStorage.removeItem("drupalauth") //remove from localStorage
        dispatch(DoLogOut())
        //history.push("/")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * Handle async code using middileware
 * InitLogin() handle the api call and pass the data to dispatch
 */
//Generate auth string for next REST access

export const InitLogIn = (request_data) => {
  return async (dispatch) => {
    //call login REST API
    try {
      const loginresponse = await Axios.post(
        "/user/login?_format=json",
        {
          name: request_data.username,
          pass: request_data.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      if (loginresponse.status == 200) {
        let oauthKey = formatBasicAuth(request_data.username, request_data.password)
        let LoginData = loginresponse.data
        LoginData.authToken = oauthKey
        //set localstorage
        //const expirationDate = new Date(new Date().getTime() + LoginData.expiretime * 1000)
        localStorage.setItem("drupalauth", JSON.stringify(LoginData))
        dispatch(LogIn(LoginData))
      }
    } catch (error) {
      dispatch(FetchLoginFailed())
    }
  }
}
