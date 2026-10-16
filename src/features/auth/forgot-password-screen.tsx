"use client"

import { useRouter } from "next/navigation"
import { useId } from "react"
import { TextField } from "@/components/form/text-field"
import { Screen } from "@/components/shell/screen"
import { Button } from "@/components/ui/button"
import { useAuthDraft } from "@/features/auth/auth-draft"
import { useForm } from "@/hooks/use-form"
import { validateEmail } from "@/lib/form/validation"

export function ForgotPasswordScreen() {
	const { draft, setDraft } = useAuthDraft()
	const router = useRouter()
	const formId = useId()
	const form = useForm({ email: draft.email }, values => ({
		email: validateEmail(values.email),
	}))

	return (
		<Screen
			title="Zapomenuté heslo"
			backHref="/sign-in"
			footer={
				<Button type="submit" form={formId} size="lg">
					Poslat odkaz
				</Button>
			}
		>
			<form
				id={formId}
				noValidate
				onSubmit={form.handleSubmit(values => {
					setDraft({ ...draft, email: values.email.trim() })
					router.push("/forgot-password/sent")
				})}
				className="flex flex-col gap-5 px-4 pb-6"
			>
				<p className="text-muted-foreground">
					Napiš e-mail, se kterým se přihlašuješ. Pošleme ti odkaz pro nastavení
					nového hesla.
				</p>
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
			</form>
		</Screen>
	)
}
