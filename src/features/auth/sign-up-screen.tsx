"use client"

import { useRouter } from "next/navigation"
import { useId } from "react"

import { Screen } from "@/components/shell/screen"
import { Button } from "@/components/ui/button"
import { useAuthDraft } from "@/features/auth/auth-draft"
import { StepLabel } from "@/features/auth/components/step-label"
import { TextField } from "@/features/auth/components/text-field"
import { useForm } from "@/features/auth/use-form"
import { validateEmail, validateNewPassword } from "@/features/auth/validation"

export function SignUpScreen() {
	const { draft, setDraft } = useAuthDraft()
	const router = useRouter()
	const formId = useId()
	const form = useForm(
		{ email: draft.email, password: draft.password },
		values => ({
			email: validateEmail(values.email),
			password: validateNewPassword(values.password),
		})
	)

	return (
		<Screen
			title="Vytvořit účet"
			backHref="/welcome"
			footer={
				<>
					<Button type="submit" form={formId} size="lg">
						Pokračovat
					</Button>
					{/* Terms and privacy open in a simulated browser in step 5. */}
					<p className="py-1 text-center text-xs text-muted-foreground">
						Pokračováním souhlasíš s obchodními podmínkami a zásadami ochrany
						osobních údajů.
					</p>
				</>
			}
		>
			<StepLabel step={1} of={2} />
			<form
				id={formId}
				noValidate
				onSubmit={form.handleSubmit(values => {
					setDraft(values)
					router.push("/sign-up/profile")
				})}
				className="flex flex-col gap-5 px-4 pt-2 pb-6"
			>
				<TextField
					label="E-mail"
					type="email"
					inputMode="email"
					autoComplete="email"
					placeholder="jmeno@email.cz"
					value={form.values.email}
					onValueChange={value => form.setValue("email", value)}
					onBlur={() => form.blur("email")}
					error={form.visibleError("email")}
				/>
				<TextField
					label="Heslo"
					type="password"
					autoComplete="new-password"
					hint="Aspoň 8 znaků."
					value={form.values.password}
					onValueChange={value => form.setValue("password", value)}
					onBlur={() => form.blur("password")}
					error={form.visibleError("password")}
				/>
			</form>
		</Screen>
	)
}
