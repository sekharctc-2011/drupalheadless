import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import HeaderLoggedOut from "./HeaderLoggedOut"
import HeaderLoggedIn from "./HeaderLoggedIn"
import StateContext from "../StateContext"
// import GlobalContext from "../GlobalContext"

function Header(props) {
  // const { setLoggedIn } = useContext(GlobalContext)

  const appState = useContext(StateContext)

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            Drupal Headless App
          </Link>
        </h4>

        {/* {appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />} */}
        {props.user_login ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
      </div>
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    user_login: state.loggedIn,
  }
}

export default connect(mapStateToProps)(Header)
