"use client"

import { useRouter } from "next/navigation"
import { useEffect, useId } from "react"
import { TextField } from "@/components/form/text-field"
import { Screen } from "@/components/shell/screen"
import { SegmentedControl } from "@/components/shell/segmented-control"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FieldError } from "@/components/ui/field-error"
import { useAuthDraft } from "@/features/auth/auth-draft"
import { StepLabel } from "@/features/auth/components/step-label"
import { useForm } from "@/hooks/use-form"
import { openGyms } from "@/lib/data/gyms"
import { useDemo } from "@/lib/demo/context"
import {
	validateBirthDate,
	validatePhone,
	validateRequired,
} from "@/lib/form/validation"
import type { GymSlug } from "@/lib/types/gym"

const GYM_OPTIONS = openGyms.map(gym => ({ value: gym.slug, label: gym.city }))

// The fields are the prototype's assumption: the real set (and whether one
// sign-up registers you at every gym) is still open with the client.
// Assumed here: one account for all gyms, with a home gym for the app.
export function ProfileSetupScreen() {
	const { draft } = useAuthDraft()
	const { completeSignUp } = useDemo()
	const router = useRouter()
	const formId = useId()
	const consentId = useId()
	const form = useForm(
		{
			firstName: "",
			lastName: "",
			phone: "+420 ",
			birthDate: "",
			homeGym: "brno" as GymSlug,
			consent: false as boolean,
		},
		values => ({
			firstName: validateRequired(values.firstName, "Vyplň jméno."),
			lastName: validateRequired(values.lastName, "Vyplň příjmení."),
			phone: validatePhone(values.phone),
			birthDate: validateBirthDate(values.birthDate),
			consent: values.consent
				? undefined
				: "Bez souhlasu s návštěvním řádem to nepůjde.",
		})
	)

	// Reached without step 1 (e.g. a reload): start the sign-up again.
	useEffect(() => {
		if (!draft.email) {
			router.replace("/sign-up")
		}
	}, [draft.email, router])

	const consentError = form.visibleError("consent")

	return (
		<Screen
			title="Tvůj profil"
			backHref="/sign-up"
			footer={
				<Button type="submit" form={formId} size="lg">
					Dokončit registraci
				</Button>
			}
		>
			<StepLabel step={2} of={2} />
			<form
				id={formId}
				noValidate
				onSubmit={form.handleSubmit(values => {
					completeSignUp({
						email: draft.email,
						firstName: values.firstName,
						lastName: values.lastName,
						phone: values.phone,
						birthDate: values.birthDate,
						homeGym: values.homeGym,
					})
					router.replace("/onboarding")
				})}
				className="flex flex-col gap-5 px-4 pt-2 pb-6"
			>
				<TextField
					label="Jméno"
					autoComplete="given-name"
					value={form.values.firstName}
					onValueChange={value => form.setValue("firstName", value)}
					onBlur={() => form.blur("firstName")}
					error={form.visibleError("firstName")}
				/>
				<TextField
					label="Příjmení"
					autoComplete="family-name"
					value={form.values.lastName}
					onValueChange={value => form.setValue("lastName", value)}
					onBlur={() => form.blur("lastName")}
					error={form.visibleError("lastName")}
				/>
				<TextField
					label="Telefon"
					type="tel"
					inputMode="tel"
					autoComplete="tel"
					value={form.values.phone}
					onValueChange={value => form.setValue("phone", value)}
					onBlur={() => form.blur("phone")}
					error={form.visibleError("phone")}
				/>
				<TextField
					label="Datum narození"
					type="date"
					autoComplete="bday"
					value={form.values.birthDate}
					onValueChange={value => form.setValue("birthDate", value)}
					onBlur={() => form.blur("birthDate")}
					error={form.visibleError("birthDate")}
				/>
				<div className="flex flex-col gap-1.5">
					<p className="text-sm font-medium">Domovská pobočka</p>
					<SegmentedControl
						label="Domovská pobočka"
						options={GYM_OPTIONS}
						value={form.values.homeGym}
						onChange={value => form.setValue("homeGym", value)}
					/>
					<p className="text-sm text-muted-foreground">
						Aplikace ti ji ukáže jako první. Změnit ji můžeš kdykoli.
					</p>
				</div>
				<div className="flex flex-col gap-1.5">
					<div className="flex items-start gap-3">
						<Checkbox
							id={consentId}
							checked={form.values.consent}
							onCheckedChange={checked => form.setValue("consent", checked)}
							aria-invalid={consentError ? true : undefined}
							className="mt-0.5"
						/>
						<label htmlFor={consentId} className="text-base">
							Souhlasím s návštěvním řádem Hangaru
						</label>
					</div>
					{consentError && <FieldError>{consentError}</FieldError>}
				</div>
			</form>
		</Screen>
	)
}
