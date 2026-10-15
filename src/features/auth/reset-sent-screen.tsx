"use client"

import Link from "next/link"

import { WallProfile } from "@/components/brand/wall-profile"
import { Screen } from "@/components/shell/screen"
import { buttonVariants } from "@/components/ui/button"
import { MailIcon } from "@/components/ui/icons"
import { useAuthDraft } from "@/features/auth/auth-draft"
import { cn } from "@/lib/utils"

export function ResetSentScreen() {
	const { draft } = useAuthDraft()

	return (
		<Screen
			backHref="/forgot-password"
			footer={
				<>
					<Link href="/mail" className={cn(buttonVariants({ size: "lg" }))}>
						Otevřít e-mail
					</Link>
					<Link
						href="/welcome"
						className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
					>
						Zpět na úvod
					</Link>
				</>
			}
		>
			<div className="flex flex-col px-6 pt-10 pb-6">
				<WallProfile
					profile="monster"
					className="w-[70%]"
					contentClassName="items-center"
				>
					<MailIcon className="size-14" aria-hidden="true" />
				</WallProfile>
				<h1 className="mt-10 text-h1">Zkontroluj e-mail</h1>
				<p className="mt-3 text-lead text-muted-foreground">
					{draft.email
						? `Poslali jsme odkaz pro nové heslo na ${draft.email}.`
						: "Poslali jsme ti odkaz pro nové heslo."}{" "}
					Nic nepřišlo? Mrkni do spamu.
				</p>
			</div>
		</Screen>
	)
}
