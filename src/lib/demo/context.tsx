"use client"

import { createContext, use, useCallback, useEffect, useState } from "react"

import { DEMO_PUSH } from "@/lib/data/notifications"
import * as profileEdits from "@/lib/demo/profile"
import {
	addPaymentCard as addPaymentCardToState,
	cancelRenewal as cancelRenewalInState,
	type NewCardInput,
	purchaseProduct,
} from "@/lib/demo/purchase"
import { createScenarioState, DEFAULT_SCENARIO } from "@/lib/demo/scenarios"
import { createSignedUpState } from "@/lib/demo/sign-up"
import { loadDemoState, saveDemoState } from "@/lib/demo/storage"
import type { AppNotification } from "@/lib/types/app-notification"
import type { DemoScenarioId } from "@/lib/types/demo-scenario"
import type { DemoState } from "@/lib/types/demo-state"
import type { DiscountCardType } from "@/lib/types/discount-card"
import type { GymSlug } from "@/lib/types/gym"
import type { KidAccount } from "@/lib/types/kid-account"
import type { NotificationPrefKey } from "@/lib/types/notification-prefs"
import type { PermissionState } from "@/lib/types/permission-state"
import type { SignUpInput } from "@/lib/types/sign-up-input"
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
	signIn: () => void
	signOut: () => void
	completeSignUp: (input: SignUpInput) => void
	deleteAccount: () => void
	setPermission: (
		permission: keyof DemoState["permissions"],
		value: PermissionState
	) => void
	sendPush: () => void
	dismissPush: () => void
	// Simulated payment. Fails once when the demo panel's "payment error
	// on next checkout" is on (the switch then turns itself off).
	purchase: (
		productId: string,
		paymentCardId: string
	) => { ok: true; ownedId: string } | { ok: false }
	cancelRenewal: (ownedId: string) => void
	addPaymentCard: (input: NewCardInput) => string
	updateProfile: (edit: profileEdits.ProfileEdit) => void
	setDefaultCard: (cardId: string) => void
	updateCardExpiry: (cardId: string, expiry: string) => void
	removeCard: (cardId: string) => void
	addDiscountCard: (type: DiscountCardType, cardNumber: string) => void
	removeDiscountCard: (type: DiscountCardType) => void
	saveKid: (kid: KidAccount) => void
	removeKid: (kidId: string) => void
	setNotificationPref: (key: NotificationPrefKey, value: boolean) => void
	markNotificationRead: (id: string) => void
	markAllNotificationsRead: () => void
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

	// Any credentials pass. A user who signed out comes back with their
	// data; with no account yet, sign-in loads the demo user.
	const signIn = useCallback(() => {
		setState(current =>
			current?.user
				? { ...current, isLoggedIn: true }
				: createScenarioState("active-membership")
		)
	}, [])

	const signOut = useCallback(
		() => update(current => ({ ...current, isLoggedIn: false })),
		[update]
	)

	const completeSignUp = useCallback((input: SignUpInput) => {
		setState(createSignedUpState(input))
	}, [])

	const deleteAccount = useCallback(() => {
		setState(createScenarioState("new-user"))
		setPush(null)
	}, [])

	const setPermission = useCallback(
		(permission: keyof DemoState["permissions"], value: PermissionState) =>
			update(current => ({
				...current,
				permissions: { ...current.permissions, [permission]: value },
			})),
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

	// These read the current state to return a result right away, so they
	// aren't memoised like the setters above.
	function purchase(productId: string, paymentCardId: string) {
		if (!state) {
			return { ok: false } as const
		}
		if (state.system.paymentErrorNextCheckout) {
			setState({
				...state,
				system: { ...state.system, paymentErrorNextCheckout: false },
			})
			return { ok: false } as const
		}
		const result = purchaseProduct(state, productId, paymentCardId)
		setState(result.state)
		return { ok: true, ownedId: result.ownedId } as const
	}

	function addPaymentCard(input: NewCardInput) {
		if (!state) {
			return ""
		}
		const result = addPaymentCardToState(state, input)
		setState(result.state)
		return result.cardId
	}

	const profileActions = {
		updateProfile: (edit: profileEdits.ProfileEdit) =>
			update(current => profileEdits.updateProfile(current, edit)),
		setDefaultCard: (cardId: string) =>
			update(current => profileEdits.setDefaultCard(current, cardId)),
		updateCardExpiry: (cardId: string, expiry: string) =>
			update(current => profileEdits.updateCardExpiry(current, cardId, expiry)),
		removeCard: (cardId: string) =>
			update(current => profileEdits.removeCard(current, cardId)),
		addDiscountCard: (type: DiscountCardType, cardNumber: string) =>
			update(current =>
				profileEdits.addDiscountCard(current, type, cardNumber)
			),
		removeDiscountCard: (type: DiscountCardType) =>
			update(current => profileEdits.removeDiscountCard(current, type)),
		saveKid: (kid: KidAccount) =>
			update(current => profileEdits.saveKid(current, kid)),
		removeKid: (kidId: string) =>
			update(current => profileEdits.removeKid(current, kidId)),
		markNotificationRead: (id: string) =>
			update(current => ({
				...current,
				notifications: current.notifications.map(item =>
					item.id === id ? { ...item, read: true } : item
				),
			})),
		markAllNotificationsRead: () =>
			update(current => ({
				...current,
				notifications: current.notifications.map(item => ({
					...item,
					read: true,
				})),
			})),
		setNotificationPref: (key: NotificationPrefKey, value: boolean) =>
			update(current => ({
				...current,
				notificationPrefs: { ...current.notificationPrefs, [key]: value },
			})),
	}

	const cancelRenewal = useCallback(
		(ownedId: string) =>
			update(current => cancelRenewalInState(current, ownedId)),
		[update]
	)

	return (
		<DemoContext
			value={{
				state,
				push,
				loadScenario,
				resetDemo,
				setSystemFlag,
				selectGym,
				signIn,
				signOut,
				completeSignUp,
				deleteAccount,
				setPermission,
				sendPush,
				dismissPush,
				purchase,
				cancelRenewal,
				addPaymentCard,
				...profileActions,
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
