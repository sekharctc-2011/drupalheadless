import React, { useEffect, useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
//import Axios from "axios"
// import DispatchContext from "../DispatchContext"
// import StateContext from "../StateContext"

import { connect } from "react-redux"
import * as globalActions from "../store/actions/index"

// import GlobalContext from "../GlobalContext"

function HeaderLoggedIn(props) {
  //let history = useHistory()
  // const { setLoggedIn } = useContext(GlobalContext)
  // const appDispatch = useContext(DispatchContext)
  // const appState = useContext(StateContext)
  //Logout Handler
  function HandleLogout() {
    props.userLogout() //call dispatch reducer from redux

    //get data from localstorage
    // if (Boolean(appState.user)) {
    //   /*
    //   const drupalauth = JSON.parse(localStorage.getItem("drupalauth"))
    //   const logout_token = drupalauth.logout_token
    //   */
    //   const logout_token = appState.user.logout_token
    //   try {
    //     const response = await Axios.post("/rest/session/token", { withCredentials: true })
    //     if (response.data) {
    //       const csrfToken = response.data
    //       const userlogout = await Axios.post(
    //         "/user/logout?_format=json&token=" + logout_token,
    //         {},
    //         {
    //           headers: { "Content-Type": "application/x-www-form-urlencoded", "X-CSRF-Token": csrfToken },
    //           withCredentials: true,
    //         }
    //       )
    //       if (userlogout.status == 204) {
    //         //localStorage.removeItem("drupalauth")
    //         appDispatch({ type: "logout" })
    //         history.push("/")
    //       }
    //     } else {
    //       console.log("Error in REST Session token")
    //     }
    //   } catch (error) {
    //     console.log("Error in API")
    //   }
    // }
  }

  function handleSearchbtn(e) {
    e.preventDefault()
    //appDispatch({ type: "openSearch" })
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a onClick={handleSearchbtn} href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Link to={`/profile/${props.user.current_user.uid}`} className="mr-2">
        <img className="small-header-avatar" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" />
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/create-article">
        Create Article
      </Link>
      <button onClick={HandleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    userLogout: () => dispatch(globalActions.DoLogOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLoggedIn)
