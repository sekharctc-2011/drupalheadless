import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { Link, useParams } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import Page from "./Page"
import LoadingSpiners from "./Loadingspiner"
import NotFound from "./Notfound"

function EditPost() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const basic_auth = appState.user.authToken
  const csrf_token = appState.user.csrf_token

  const originalState = {
    title: {
      value: "",
      hasError: false,
      message: "",
    },
    body: {
      value: "",
      hasError: false,
      message: "",
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0,
    notFound: false,
  }

  function functionReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title[0].value
        draft.body.value = action.value.body[0].value
        draft.isFetching = false
        break
      case "chnageTitle":
        draft.title.hasError = false
        draft.title.value = action.value
        break
      case "chnageBody":
        draft.body.hasError = false
        draft.body.value = action.value
        break
      case "updatePost":
        if (!draft.title.hasError && !draft.body.hasError) {
          draft.sendCount++
        }
        break
      case "savingRequestStated":
        draft.isSaving = true
        break
      case "savingRequestFinished":
        draft.isSaving = false
        break
      case "titleRules":
        if (!action.value.trim()) {
          draft.title.hasError = true
          draft.title.message = "Title should not be blank!"
        }
        break
      case "bodyRules":
        if (!action.value.trim()) {
          draft.body.hasError = true
          draft.body.message = "Body should not be blank!"
        }
        break
      case "notFound":
        draft.notFound = true
        break

      default:
        break
    }
  }

  const [state, dispatch] = useImmerReducer(functionReducer, originalState)

  const HandleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: "titleRules", value: state.title.value })
    dispatch({ type: "bodyRules", value: state.body.value })
    dispatch({ type: "updatePost" })
  }

  /**
   * Fetch post data from REST on page load
   */
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/node/${state.id}?_format=json`, { cancelToken: ourRequest.token }, { headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf_token, Authorization: basic_auth } })
        if (response.data) {
          dispatch({ type: "fetchComplete", value: response.data })
        } else {
          dispatch({ type: "notFound" })
        }
      } catch (error) {
        console.log("There was some error in Rest API!")
      }
    }
    fetchPosts()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  /**
   * second useEffect for update post in server
   */
  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "savingRequestStated" })
      const ourRequest = Axios.CancelToken.source()

      const newArticle = {
        type: [
          {
            target_id: "article",
          },
        ],
        title: [
          {
            value: state.title.value,
          },
        ],

        body: [
          {
            value: state.body.value,
          },
        ],
      }

      async function savePost() {
        try {
          const response = await Axios.patch(`/node/${state.id}?_format=json`, newArticle, { cancelToken: ourRequest.token, headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf_token, Authorization: basic_auth } })

          dispatch({ type: "savingRequestFinished" })
          appDispatch({ type: "flashMessage", value: "Post was update." })
        } catch (error) {
          console.log("There was some error in Rest API!")
        }
      }
      savePost()
      return () => {
        ourRequest.cancel()
      }
    }
  }, [state.sendCount])

  if (state.notFound) {
    return <NotFound />
  }
  if (state.isFetching)
    return (
      <Page title="....">
        <LoadingSpiners />
      </Page>
    )

  return (
    <Page title="Edit content post">
      <form onSubmit={HandleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            onChange={(e) => {
              dispatch({ type: "chnageTitle", value: e.target.value })
            }}
            onBlur={(e) => {
              dispatch({ type: "titleRules", value: e.target.value })
            }}
            value={state.title.value}
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
          {state.title.hasError && <div className="alert alert-danger small liveValidateMessage">{state.title.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            onChange={(e) => {
              dispatch({ type: "chnageBody", value: e.target.value })
            }}
            onBlur={(e) => {
              dispatch({ type: "bodyRules", value: e.target.value })
            }}
            value={state.body.value}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          ></textarea>
          {state.body.hasError && <div className="alert alert-danger small liveValidateMessage"> {state.body.message} </div>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={state.isSaving}>
          {state.isSaving ? "Update Post...." : "Save Post"}
        </button>
      </form>
    </Page>
  )
}

export default EditPost
