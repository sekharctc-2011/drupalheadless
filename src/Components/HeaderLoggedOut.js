import React, { useEffect, useState, useContext } from "react"

import { connect } from "react-redux"

//import Axios from "axios"
//import DispatchContext from "../DispatchContext"
// import GlobalContext from "../GlobalContext"

import * as globalActions from "../store/actions/index"

function HeaderLoggedOut(props) {
  //const appDispatch = useContext(DispatchContext)

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  // const { setLoggedIn } = useContext(GlobalContext)

  const LoginHandler = (e) => {
    e.preventDefault()

    props.handleLogIn({ username, password })
    console.log(props.usr)

    // try {
    //   const response = await Axios.post("/rest/session/token", { withCredentials: true })
    //   if (response.data) {
    //     console.log(response.data)
    //     const csrfToken = response.data
    //     //call login REST API
    //     const loginresponse = await Axios.post(
    //       "/user/login?_format=json",
    //       {
    //         name: username,
    //         pass: password,
    //       },
    //       {
    //         headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken },
    //         withCredentials: true,
    //       }
    //     )
    //     if (loginresponse.data) {
    //       //console.log(loginresponse.data)
    //       let LoginData = loginresponse.data
    //       //set state for the loggin && save data to localstorage
    //       //localStorage.setItem("drupalauth", JSON.stringify(LoginData))
    //       let authString = formatBasicAuth(username, password)
    //       LoginData.authToken = authString //add authstring to existing json response data
    //       //console.log(LoginData)
    //       // appDispatch({ type: "login", data: LoginData })
    //     } else {
    //       console.log("Invalid login data!")
    //     }
    //   } else {
    //     console.log("Invalid data")
    //   }
    // } catch (e) {
    //   console.log("Error!, Login failed")
    // }
  }
  return (
    <form onSubmit={LoginHandler} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={(e) => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={(e) => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    usr: state.user,
    login: state.loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogIn: (userData) => dispatch(globalActions.InitLogIn(userData)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderLoggedOut)
