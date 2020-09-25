import React, { useEffect, useState, useContext } from "react"
import Page from "./Page"
import ProfilePosts from "./ProfilePosts"
import StateContext from "../StateContext"

import { useSelector } from "react-redux"

function Profile() {
  //const appState = useContext(StateContext)
  const user_name = useSelector((state) => state.user.current_user.name)

  return (
    <Page title="profile view">
      <h2>
        <img className="avatar-small" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> {user_name}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>
      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: 3
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: 101
        </a>
        <a href="#" className="nav-item nav-link">
          Following: 40
        </a>
      </div>
      <ProfilePosts />
    </Page>
  )
}

export default Profile
