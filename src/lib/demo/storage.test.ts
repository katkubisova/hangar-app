import { createScenarioState } from "@/lib/demo/scenarios"
import { loadDemoState, saveDemoState } from "@/lib/demo/storage"

describe("demo storage", () => {
	afterEach(() => {
		vi.restoreAllMocks()
		window.localStorage.clear()
	})

	it("saves and loads the state", () => {
		const state = createScenarioState("active-membership")
		saveDemoState(state)
		expect(loadDemoState()).toEqual(state)
	})

	it("works when localStorage throws", () => {
		// Safari with blocked site data throws on any access.
		vi.spyOn(window, "localStorage", "get").mockImplementation(() => {
			throw new Error("blocked")
		})
		expect(() => saveDemoState(createScenarioState("new-user"))).not.toThrow()
		expect(loadDemoState()).toBeNull()
	})

	it("ignores corrupt data", () => {
		window.localStorage.setItem("hangar-app-demo-v4", "{not json")
		expect(loadDemoState()).toBeNull()
	})
})
