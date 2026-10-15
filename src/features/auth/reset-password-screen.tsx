"use client"

import Link from "next/link"
import { useId, useState } from "react"

import { WallProfile } from "@/components/brand/wall-profile"
import { Screen } from "@/components/shell/screen"
import { Button, buttonVariants } from "@/components/ui/button"
import { CheckIcon } from "@/components/ui/icons"
import { TextField } from "@/features/auth/components/text-field"
import { useForm } from "@/features/auth/use-form"
import {
	validateNewPassword,
	validatePasswordMatch,
} from "@/features/auth/validation"
import { cn } from "@/lib/utils"

// Opened from the reset link in the (simulated) e-mail. After saving, the
// flow ends back on Welcome, where the user signs in with the new password.
export function ResetPasswordScreen() {
	const formId = useId()
	const [done, setDone] = useState(false)
	const form = useForm({ password: "", confirm: "" }, values => ({
		password: validateNewPassword(values.password),
		confirm: validatePasswordMatch(values.confirm, values.password),
	}))

	if (done) {
		return (
			<Screen
				footer={
					<Link href="/welcome" className={cn(buttonVariants({ size: "lg" }))}>
						Zpět na úvod
					</Link>
				}
			>
				<div className="flex flex-col px-6 pt-16 pb-6">
					<WallProfile
						profile="nose"
						className="w-[60%]"
						contentClassName="items-center"
					>
						<CheckIcon className="size-14" aria-hidden="true" />
					</WallProfile>
					<h1 className="mt-10 text-h1">Heslo je změněné</h1>
					<p className="mt-3 text-lead text-muted-foreground">
						Teď se můžeš přihlásit s novým heslem.
					</p>
				</div>
			</Screen>
		)
	}

	return (
		<Screen
			title="Nové heslo"
			backHref="/mail"
			footer={
				<Button type="submit" form={formId} size="lg">
					Uložit heslo
				</Button>
			}
		>
			<form
				id={formId}
				noValidate
				onSubmit={form.handleSubmit(() => setDone(true))}
				className="flex flex-col gap-5 px-4 pb-6"
			>
				<TextField
					label="Nové heslo"
					type="password"
					autoComplete="new-password"
					hint="Aspoň 8 znaků."
					value={form.values.password}
					onValueChange={value => form.setValue("password", value)}
					onBlur={() => form.blur("password")}
					error={form.visibleError("password")}
				/>
				<TextField
					label="Heslo znovu"
					type="password"
					autoComplete="new-password"
					value={form.values.confirm}
					onValueChange={value => form.setValue("confirm", value)}
					onBlur={() => form.blur("confirm")}
					error={form.visibleError("confirm")}
				/>
			</form>
		</Screen>
	)
}
