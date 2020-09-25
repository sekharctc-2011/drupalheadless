import React, { useEffect, useState, useContext } from "react"
import Page from "./Page"
import Axios from "axios"
import { withRouter } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
// import GlobalContext from "../GlobalContext"

function CreateArticle(props) {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  // const { addFlashMessages } = useContext(GlobalContext)
  /*
  const drupal_user = "subhs"
  const drupal_pwd = "sekhar_234567"

  const formatBasicAuth = (userName, password) => {
    let basicAuthCredential = userName + ":" + password
    let bace64 = btoa(basicAuthCredential)
    return "Basic " + bace64
  }
  */

  const HandleSubmit = async (e) => {
    e.preventDefault()

    const basic_auth = appState.user.authToken
    try {
      const response = await Axios.post("/rest/session/token?_format=json", { withCredentials: true })
      if (response.data) {
        const csrf_token = response.data
        // const basic_auth = formatBasicAuth(drupal_user, drupal_pwd)

        const newArticle = {
          langcode: [
            {
              value: "en",
            },
          ],
          type: [
            {
              target_id: "article",
            },
          ],
          title: [
            {
              value: title,
            },
          ],
          body: [
            {
              value: body,
            },
          ],
          field_catg: [
            {
              target_id: 1,
            },
          ],
        }
        const article_post = await Axios.post("/node?_format=json", newArticle, {
          headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf_token, Authorization: basic_auth },
        })
        if (article_post.status === 201) {
          console.log("Article created")
          appDispatch({ type: "flashMessage", value: "Congrats, you created a new post." })
          // addFlashMessages("Thank you!, Post created....")
          const respond_data = article_post.data
          const post_id = respond_data.nid[0].value
          props.history.push(`/post/${post_id}`)
        }
      }
    } catch (e) {
      console.log("There is something error in API")
    }
  }

  return (
    <Page title="Create article content">
      <form onSubmit={HandleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={(e) => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={(e) => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Save New Post
        </button>
      </form>
    </Page>
  )
}

export default withRouter(CreateArticle)
