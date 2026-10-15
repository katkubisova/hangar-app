"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { WallProfile } from "@/components/brand/wall-profile"
import { SystemAlert } from "@/components/shell/system-alert"
import { Button } from "@/components/ui/button"
import { NotificationIcon } from "@/components/ui/icons"
import { useDemo } from "@/lib/demo/context"
import type { PermissionState } from "@/lib/types/permission-state"

// In-app pre-prompt before the (simulated) system permission pop-up, so
// people know why we ask. The choice is saved; "Teď ne" asks again later.
export function PushPermissionScreen() {
	const { setPermission } = useDemo()
	const router = useRouter()
	const [systemPrompt, setSystemPrompt] = useState(false)

	function finish(value?: PermissionState) {
		if (value) {
			setPermission("push", value)
		}
		router.replace("/home")
	}

	return (
		<div className="flex h-full flex-col bg-background pt-safe duration-200 animate-in fade-in-0">
			<div className="flex min-h-0 flex-1 flex-col justify-center px-6">
				<WallProfile
					profile="boomerang"
					className="mx-auto w-[70%]"
					contentClassName="items-center"
				>
					<NotificationIcon className="size-16" aria-hidden="true" />
				</WallProfile>
				<h1 className="mt-10 text-h1">Nic ti neuteče</h1>
				<p className="mt-3 text-lead text-muted-foreground">
					Dáme vědět, když ti končí členství, projde platba nebo přibudou nové
					bouldery.
				</p>
			</div>
			<div className="flex shrink-0 flex-col gap-2 px-6 pt-4 pb-[calc(var(--safe-bottom)+1rem)]">
				<Button size="lg" onClick={() => setSystemPrompt(true)}>
					Povolit notifikace
				</Button>
				<Button size="lg" variant="ghost" onClick={() => finish()}>
					Teď ne
				</Button>
			</div>

			<SystemAlert
				open={systemPrompt}
				title="„HANGAR“ vám chce posílat oznámení"
				message="Oznámení mohou obsahovat upozornění, zvuky a odznaky ikon. Můžete to změnit v Nastavení."
				actions={[
					{ label: "Nepovolit", onPress: () => finish("denied") },
					{
						label: "Povolit",
						style: "cancel",
						onPress: () => finish("granted"),
					},
				]}
			/>
		</div>
	)
}
