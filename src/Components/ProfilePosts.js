import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { Link, useParams } from "react-router-dom"
//import StateContext from "../StateContext"
import LoadingSpiners from "./Loadingspiner"

import { useSelector } from "react-redux"

function ProfilePosts(props) {
  //const appState = useContext(StateContext)
  const { userid } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState([])

  // const basic_auth = appState.user.authToken
  // const csrf_token = appState.user.csrf_token
  const basic_auth = useSelector((state) => state.user.authToken)
  const csrf_token = useSelector((state) => state.user.csrf_token)
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await Axios.get(`/rest/view-content/${userid}?_format=json`, {}, { headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf_token, Authorization: basic_auth } })
        setPost(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log("There was some error in Rest API!")
      }
    }
    getPosts()
  }, [])

  if (isLoading) return <LoadingSpiners />

  return (
    <div className="list-group">
      {post.map((posts) => {
        return (
          <Link key={posts.nid} to={`/post/${posts.nid}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={"http://subhsweb.local" + posts.user_picture} /> <strong>{posts.title}</strong> <span className="text-muted small">on {posts.created} </span>
          </Link>
        )
      })}
    </div>
  )
}

export default ProfilePosts
