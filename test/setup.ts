import "@testing-library/jest-dom"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

afterEach(() => {
	cleanup()
})

global.URL.createObjectURL = () => "mock-url"
global.URL.revokeObjectURL = () => {}
