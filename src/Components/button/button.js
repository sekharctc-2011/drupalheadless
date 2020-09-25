import React, { useEffect } from "react"

function ButtonComponent(props) {
  return (
    <div data-testid="button" className="btn btn-sm btn-primary">
      Hi {props.label}
    </div>
  )
}

export default ButtonComponent
