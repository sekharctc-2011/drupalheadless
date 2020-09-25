import React from "react"
import ReactDOM from "react-dom"
import ButtonComponent from "./../button"

import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"

import renderer from "react-test-renderer"

afterEach(cleanup)
it("render without crash", () => {
  const div = document.createElement("div")
  ReactDOM.render(<ButtonComponent></ButtonComponent>, div)
})

it("render button correctly", () => {
  const { getByTestId } = render(<ButtonComponent label="Click here"></ButtonComponent>)
  expect(getByTestId("button")).toHaveTextContent("Click here")
})

it("render button correctly", () => {
  const { getByTestId } = render(<ButtonComponent label="Click me please"></ButtonComponent>)
  expect(getByTestId("button")).toHaveTextContent("Click me please")
})

it("matches snapshort", () => {
  const tree = renderer.create(<ButtonComponent label="Save"></ButtonComponent>).toJSON()
  expect(tree).toMatchSnapshot()
})
