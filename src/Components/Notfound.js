import React, { useEffect } from "react"
import Page from "./Page"

function NotFound() {
  return (
    <Page title="Not Found">
      <div className="text-center">
        <h2>Whoops, Page not found! 404</h2>
        <p className="lead text-muted">You can visit the home page</p>
      </div>
    </Page>
  )
}

export default NotFound
