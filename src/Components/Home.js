import React, { useEffect, useContext } from "react"
import Page from "./Page"
import StateContext from "../StateContext"
import { connect } from "react-redux"

function Home(props) {
  //const drupalauth = JSON.parse(localStorage.getItem("drupalauth"))
  const appState = useContext(StateContext)

  return (
    <Page title="Logged In">
      <h2 className="text-center">
        Hello <strong>{props.user.current_user.name}</strong>, your feed is empty.
      </h2>
      <p className="lead text-muted text-center">Your feed displays the latest posts from the people you follow. If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Home)
