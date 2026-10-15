"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useId } from "react"

import { Screen } from "@/components/shell/screen"
import { Button } from "@/components/ui/button"
import { TextField } from "@/features/auth/components/text-field"
import { useForm } from "@/features/auth/use-form"
import {
	validateEmail,
	validatePasswordFilled,
} from "@/features/auth/validation"
import { useDemo } from "@/lib/demo/context"

// Any well-formed e-mail and any password pass (prototype).
export function SignInScreen() {
	const { signIn } = useDemo()
	const router = useRouter()
	const formId = useId()
	const form = useForm({ email: "", password: "" }, values => ({
		email: validateEmail(values.email),
		password: validatePasswordFilled(values.password),
	}))

	return (
		<Screen
			title="Přihlášení"
			backHref="/welcome"
			footer={
				<>
					<Button type="submit" form={formId} size="lg">
						Přihlásit se
					</Button>
					<p className="py-1 text-center text-sm text-muted-foreground">
						Nemáš účet?{" "}
						<Link href="/sign-up" className="link">
							Vytvořit účet
						</Link>
					</p>
				</>
			}
		>
			<form
				id={formId}
				noValidate
				onSubmit={form.handleSubmit(() => {
					signIn()
					router.replace("/home")
				})}
				className="flex flex-col gap-5 px-4 pb-6"
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
					autoComplete="current-password"
					value={form.values.password}
					onValueChange={value => form.setValue("password", value)}
					onBlur={() => form.blur("password")}
					error={form.visibleError("password")}
				/>
				<Link href="/forgot-password" className="link self-start py-1">
					Zapomenuté heslo?
				</Link>
			</form>
		</Screen>
	)
}
