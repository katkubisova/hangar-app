"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { SystemAlert } from "@/components/shell/system-alert"
import { CallIcon, ChevronRightIcon, MailIcon } from "@/components/ui/icons"
import type { OpenGym } from "@/lib/types/gym"

interface GymContactsProps {
	gym: OpenGym
	// Pre-filled subject of the (simulated) e-mail.
	subject: string
}

// A gym's phone and e-mail as tappable rows. Calling shows the phone's
// "call?" alert; e-mail opens the simulated compose screen. Nothing is
// actually called or sent.
export function GymContacts({ gym, subject }: GymContactsProps) {
	const router = useRouter()
	const [confirmCall, setConfirmCall] = useState(false)
	const composeHref = `/compose?${new URLSearchParams({ to: gym.email, subject })}`

	return (
		<>
			<ul className="border-t">
				<li className="border-b">
					<button
						type="button"
						onClick={() => setConfirmCall(true)}
						className="flex min-h-14 w-full items-center gap-3 px-4 py-2 text-left active:bg-muted"
					>
						<CallIcon className="size-6 shrink-0" aria-hidden="true" />
						<span className="min-w-0 flex-1">
							<span className="block text-sm text-muted-foreground">
								Zavolat na recepci
							</span>
							<span className="block text-base font-medium">{gym.phone}</span>
						</span>
						<ChevronRightIcon
							className="size-5 text-muted-foreground"
							aria-hidden="true"
						/>
					</button>
				</li>
				<li className="border-b">
					<button
						type="button"
						onClick={() => router.push(composeHref)}
						className="flex min-h-14 w-full items-center gap-3 px-4 py-2 text-left active:bg-muted"
					>
						<MailIcon className="size-6 shrink-0" aria-hidden="true" />
						<span className="min-w-0 flex-1">
							<span className="block text-sm text-muted-foreground">
								Napsat e-mail
							</span>
							<span className="block truncate text-base font-medium">
								{gym.email}
							</span>
						</span>
						<ChevronRightIcon
							className="size-5 text-muted-foreground"
							aria-hidden="true"
						/>
					</button>
				</li>
			</ul>

			<SystemAlert
				open={confirmCall}
				title={gym.phone}
				actions={[
					{ label: "Zrušit", onPress: () => setConfirmCall(false) },
					{
						label: "Volat",
						style: "cancel",
						onPress: () => setConfirmCall(false),
					},
				]}
			/>
		</>
	)
}
