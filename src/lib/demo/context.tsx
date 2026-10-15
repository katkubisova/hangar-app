"use client"

import { createContext, use, useCallback, useEffect, useState } from "react"

import { DEMO_PUSH } from "@/lib/data/notifications"
import { createScenarioState, DEFAULT_SCENARIO } from "@/lib/demo/scenarios"
import { loadDemoState, saveDemoState } from "@/lib/demo/storage"
import type { AppNotification } from "@/lib/types/app-notification"
import type { DemoScenarioId } from "@/lib/types/demo-scenario"
import type { DemoState } from "@/lib/types/demo-state"
import type { GymSlug } from "@/lib/types/gym"
import type { SystemFlag } from "@/lib/types/system-flags"

interface DemoContextValue {
	// null until the saved state has been read on the client. Demo data
	// depends on "today" and localStorage, so it never renders on the server.
	state: DemoState | null
	// The simulated push banner on screen right now (not saved).
	push: AppNotification | null
	loadScenario: (scenario: DemoScenarioId) => void
	resetDemo: () => void
	setSystemFlag: (flag: SystemFlag, value: boolean) => void
	selectGym: (gym: GymSlug) => void
	sendPush: () => void
	dismissPush: () => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<DemoState | null>(null)
	const [push, setPush] = useState<AppNotification | null>(null)

	useEffect(() => {
		setState(loadDemoState() ?? createScenarioState(DEFAULT_SCENARIO))
	}, [])

	useEffect(() => {
		if (state) {
			saveDemoState(state)
		}
	}, [state])

	const update = useCallback((change: (current: DemoState) => DemoState) => {
		setState(current => (current ? change(current) : current))
	}, [])

	const loadScenario = useCallback((scenario: DemoScenarioId) => {
		setState(createScenarioState(scenario))
		setPush(null)
	}, [])

	const resetDemo = useCallback(() => {
		loadScenario(DEFAULT_SCENARIO)
	}, [loadScenario])

	const setSystemFlag = useCallback(
		(flag: SystemFlag, value: boolean) =>
			update(current => ({
				...current,
				system: { ...current.system, [flag]: value },
			})),
		[update]
	)

	const selectGym = useCallback(
		(gym: GymSlug) => update(current => ({ ...current, selectedGym: gym })),
		[update]
	)

	const sendPush = useCallback(() => {
		const notification: AppNotification = {
			...DEMO_PUSH,
			id: `${DEMO_PUSH.id}-${Date.now()}`,
			createdAt: new Date().toISOString(),
			read: false,
		}
		setPush(notification)
		update(current => ({
			...current,
			notifications: [notification, ...current.notifications],
		}))
	}, [update])

	const dismissPush = useCallback(() => setPush(null), [])

	return (
		<DemoContext
			value={{
				state,
				push,
				loadScenario,
				resetDemo,
				setSystemFlag,
				selectGym,
				sendPush,
				dismissPush,
			}}
		>
			{children}
		</DemoContext>
	)
}

export function useDemo() {
	const context = use(DemoContext)
	if (!context) {
		throw new Error("useDemo must be used inside DemoProvider")
	}
	return context
}

// For screens inside the app shell, which only render once the state is
// ready (see AppShell).
export function useDemoState() {
	const { state } = useDemo()
	if (!state) {
		throw new Error("Demo state is not ready yet")
	}
	return state
}
