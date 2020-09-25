import React, { useEffect, useState, useReducer, lazy, Suspense } from "react"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { useSelector } from "react-redux"

import Axios from "axios"

/*
* Use the below code for useImmerReducer
*
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
*/

import "./App.css"
import LoadingSpiner from "./Components/Loadingspiner"
import Header from "./Components/Header"
import HomeGuest from "./Components/HomeGuest"
import Footer from "./Components/Footer"
import About from "./Components/About"
import Term from "./Components/Terms"
import Home from "./Components/Home"

import FlashMessages from "./Components/FlashMessages"
import Profile from "./Components/Profile"
import EditPost from "./Components/EditPost"
import NotFound from "./Components/Notfound"
import Search from "./Components/Search"
const ViewSinglePost = React.lazy(() => import("./Components/View-Single-Post"))
const CreateArticle = React.lazy(() => import("./Components/create-article"))
// import GlobalContext from "./GlobalContext"

Axios.defaults.baseURL = "http://subhsweb.local"
function App() {
  /**
   * const stateval = useSelector((state) => state.loggedIn)
   * console.log(stateval)
   */

  /**
   * 
   
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("drupalauth")),
    flashMessages: [],
    user: JSON.parse(localStorage.getItem("drupalauth")),
    apiToken: "",
    isSearchOpen: false,
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        console.log("login call")
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
      case "openSearch":
        draft.isSearchOpen = true
        return
      case "closeSearch":
        draft.isSearchOpen = false
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("drupalauth", JSON.stringify(state.user))
    } else {
      localStorage.removeItem("drupalauth")
    }
  }, [state.loggedIn])

  */

  //const state = store.getState()
  const loggedin = useSelector((state) => state.loggedIn)
  const isSearchOpen = useSelector((state) => state.isSearchOpen)
  const flashMessage = useSelector((state) => state.flashMessages)

  useEffect(() => {
    if (!loggedin) {
      localStorage.removeItem("drupalauth")
    }
  }, [loggedin])

  return (
    // <StateContext.Provider value={state}>
    //   <DispatchContext.Provider value={dispatch}>

    <BrowserRouter>
      <FlashMessages messages={flashMessage} />
      <Header />
      <Suspense fallback={<LoadingSpiner />}>
        <Switch>
          <Route path="/" exact>
            {loggedin ? <Home /> : <HomeGuest />}
          </Route>
          <Route path="/profile/:userid" exact>
            {loggedin ? <Profile /> : <HomeGuest />}
          </Route>
          <Route path="/post/:id" exact>
            <ViewSinglePost />
          </Route>
          <Route path="/post/:id/edit" exact>
            <EditPost />
          </Route>
          <Route path="/create-article" exact>
            <CreateArticle />
          </Route>
          <Route path="/about-us" exact>
            <About />
          </Route>
          <Route path="/terms" exact>
            <Term />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
      {/* <CSSTransition timeout={330} in={state.isSearchOpen} classNames="search-overlay" unmountOnExit> */}
      {isSearchOpen ? <Search /> : ""}
      {/* </CSSTransition> */}
      <Footer />
    </BrowserRouter>

    //   </DispatchContext.Provider>
    // </StateContext.Provider>
  )
}

export default App
