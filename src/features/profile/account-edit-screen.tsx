"use client"

import { useRouter } from "next/navigation"
import { useId } from "react"

import { TextField } from "@/components/form/text-field"
import { Screen } from "@/components/shell/screen"
import { Button } from "@/components/ui/button"
import { useForm } from "@/hooks/use-form"
import { useDemo, useDemoState } from "@/lib/demo/context"
import {
	validateBirthDate,
	validateEmail,
	validatePhone,
	validateRequired,
} from "@/lib/form/validation"

export function AccountEditScreen() {
	const { user } = useDemoState()
	const { updateProfile } = useDemo()
	const router = useRouter()
	const formId = useId()
	const form = useForm(
		{
			firstName: user?.firstName ?? "",
			lastName: user?.lastName ?? "",
			email: user?.email ?? "",
			phone: user?.phone ?? "",
			birthDate: user?.birthDate ?? "",
		},
		values => ({
			firstName: validateRequired(values.firstName, "Vyplň jméno."),
			lastName: validateRequired(values.lastName, "Vyplň příjmení."),
			email: validateEmail(values.email),
			phone: validatePhone(values.phone),
			birthDate: validateBirthDate(values.birthDate),
		})
	)

	const fields = [
		{ name: "firstName", label: "Jméno", autoComplete: "given-name" },
		{ name: "lastName", label: "Příjmení", autoComplete: "family-name" },
		{ name: "email", label: "E-mail", type: "email", autoComplete: "email" },
		{ name: "phone", label: "Telefon", type: "tel", autoComplete: "tel" },
		{
			name: "birthDate",
			label: "Datum narození",
			type: "date",
			autoComplete: "bday",
		},
	] as const

	return (
		<Screen
			title="Upravit údaje"
			backHref="/profile/account"
			backLabel="Zpět"
			footer={
				<Button type="submit" form={formId} size="lg">
					Uložit změny
				</Button>
			}
		>
			<form
				id={formId}
				noValidate
				onSubmit={form.handleSubmit(values => {
					updateProfile(values)
					router.replace("/profile/account")
				})}
				className="flex flex-col gap-5 px-4 pb-6"
			>
				{fields.map(field => (
					<TextField
						key={field.name}
						label={field.label}
						type={"type" in field ? field.type : "text"}
						autoComplete={field.autoComplete}
						value={form.values[field.name]}
						onValueChange={value => form.setValue(field.name, value)}
						onBlur={() => form.blur(field.name)}
						error={form.visibleError(field.name)}
					/>
				))}
			</form>
		</Screen>
	)
}
