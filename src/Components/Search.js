import React, { useEffect, useContext } from "react"
import { useImmer } from "use-immer"
import DispatchContext from "../DispatchContext"

function Search() {
  const appDispatch = useContext(DispatchContext)
  const [state, setState] = useImmer({
    searchString: "",
    show: "neither",
    result: [],
    requestCount: 0,
  })

  useEffect(() => {
    document.addEventListener("keyup", SearchKeypressHandler)
    return () => document.removeEventListener("keyup", SearchKeypressHandler)
  }, [])

  useEffect(() => {
    if (state.searchString.trim()) {
      setState((draft) => {
        draft.show = "loading"
      })
      const delay = setTimeout(() => {
        setState((draft) => {
          draft.requestCount++
        })
      }, 3000)

      return () => clearTimeout(delay)
    } else {
    }
  }, [state.searchString])

  useEffect(() => {
    if (state.requestCount) {
      //call Axios request
      console.log("result")
      setState((draft) => {
        //draft.result = response.data
        draft.show = "results"
      })
    }
  }, [state.requestCount])

  function SearchKeypressHandler(e) {
    if (e.keyCode == 27) {
      appDispatch({ type: "closeSearch" })
    }
  }

  function handleClose() {
    appDispatch({ type: "closeSearch" })
  }

  function handleSearch(e) {
    const value = e.target.value
    setState((draft) => {
      draft.searchString = value
    })
  }

  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input onChange={handleSearch} autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="What are you interested in?" />
          <span onClick={handleClose} className="close-live-search">
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div className="live-search-results live-search-results--visible">
            <div className="list-group shadow-sm">
              <div className="list-group-item active">
                <strong>Search Results</strong> (3 items found)
              </div>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #1</strong>
                <span className="text-muted small">by brad on 2/10/2020 </span>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128" /> <strong>Example Post #2</strong>
                <span className="text-muted small">by barksalot on 2/10/2020 </span>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #3</strong>
                <span className="text-muted small">by brad on 2/10/2020 </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
