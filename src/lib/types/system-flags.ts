// System states the presenter can switch on from the demo panel.
export interface SystemFlags {
	maintenance: boolean
	forcedUpdate: boolean
	recommendedUpdate: boolean
	feedbackPrompt: boolean
	blockedUser: boolean
	paymentErrorNextCheckout: boolean
}

export type SystemFlag = keyof SystemFlags
