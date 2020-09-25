import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { Link, useParams, withRouter } from "react-router-dom"
import StateContext from "../StateContext"
import Page from "./Page"
import LoadingSpiners from "./Loadingspiner"
import ReactMarkdown from "react-markdown"
import ReactTooltip from "react-tooltip"

function ViewSinglePost(props) {
  const appState = useContext(StateContext)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  const basic_auth = appState.user.authToken
  const csrf_token = appState.user.csrf_token
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/node/${id}?_format=json`, { cancelToken: ourRequest.token }, { headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf_token, Authorization: basic_auth } })
        setPosts(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log("There was some error in Rest API!")
      }
    }
    fetchPosts()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  async function deleteHandler() {
    const areYouSure = window.confirm("Are you sure!")
    if (areYouSure) {
      try {
        const response = await Axios.delete(`/node/${id}?_format=josn`, { headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf_token, Authorization: basic_auth } })
        if (response.status == 204) {
          alert("Deleted!")
          props.history.push(`/profile/${appState.user.current_user.uid}`)
        }
      } catch (error) {
        console.log("There was an error in Delete API!")
      }
    }
  }

  if (isLoading)
    return (
      <Page title="....">
        <LoadingSpiners />
      </Page>
    )
  const date = new Date(posts.created[0].value)
  const dateFormated = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Page title={posts.title[0].value}>
      <div className="d-flex justify-content-between">
        <h2>{posts.title[0].value}</h2>
        <span className="pt-2">
          <Link to={`/post/${id}/edit`} data-tip="Edit" data-for="edit" className="text-primary mr-2">
            <i className="fas fa-edit"></i>
          </Link>
          <ReactTooltip id="edit" className="custom-tooltip" />{" "}
          <a onClick={deleteHandler} data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
            <i className="fas fa-trash"></i>
          </a>
          <ReactTooltip id="delete" className="custom-tooltip" />
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${appState.user.current_user.uid}`}>
          <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" />
        </Link>
        Posted by <Link to={`/profile/${appState.user.current_user.uid}`}>{appState.user.current_user.name}</Link> on {dateFormated}
      </p>

      <div className="body-content">
        <ReactMarkdown source={posts.body[0].value} />
      </div>
    </Page>
  )
}

export default withRouter(ViewSinglePost)
