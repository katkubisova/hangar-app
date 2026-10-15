"use client"

import { useRouter } from "next/navigation"
import { useId, useState } from "react"

import { TextField } from "@/components/form/text-field"
import { Screen } from "@/components/shell/screen"
import { SystemAlert } from "@/components/shell/system-alert"
import { Button } from "@/components/ui/button"
import { useForm } from "@/hooks/use-form"
import { useDemo, useDemoState } from "@/lib/demo/context"
import { validateBirthYear, validateRequired } from "@/lib/form/validation"

// View, edit and add a kid account ("new" adds one). Part of the kid
// accounts block that depends on Hasam support.
export function KidScreen({ kidId }: { kidId: string }) {
	const { kids, user } = useDemoState()
	const { saveKid, removeKid } = useDemo()
	const router = useRouter()
	const formId = useId()
	const kid = kids.find(item => item.id === kidId)
	const isNew = kidId === "new"
	const [confirmRemove, setConfirmRemove] = useState(false)
	const form = useForm(
		{
			firstName: kid?.firstName ?? "",
			lastName: kid?.lastName ?? user?.lastName ?? "",
			birthYear: kid ? String(kid.birthYear) : "",
		},
		values => ({
			firstName: validateRequired(values.firstName, "Vyplň jméno."),
			lastName: validateRequired(values.lastName, "Vyplň příjmení."),
			birthYear: validateBirthYear(values.birthYear),
		})
	)

	if (!isNew && !kid) {
		return (
			<Screen title="Dítě" backHref="/profile/discounts" backLabel="Slevy">
				<p className="px-4 text-muted-foreground">
					Tenhle dětský účet už neexistuje.
				</p>
			</Screen>
		)
	}

	return (
		<Screen
			title={isNew ? "Přidat dítě" : `${kid?.firstName} ${kid?.lastName}`}
			backHref="/profile/discounts"
			backLabel="Slevy"
			footer={
				<>
					<Button type="submit" form={formId} size="lg">
						{isNew ? "Přidat dítě" : "Uložit změny"}
					</Button>
					{!isNew && (
						<Button
							variant="ghost"
							size="lg"
							onClick={() => setConfirmRemove(true)}
						>
							Odebrat dětský účet
						</Button>
					)}
				</>
			}
		>
			<form
				id={formId}
				noValidate
				onSubmit={form.handleSubmit(values => {
					saveKid({
						id: isNew ? `kid-${Date.now()}` : kidId,
						firstName: values.firstName.trim(),
						lastName: values.lastName.trim(),
						birthYear: Number(values.birthYear),
					})
					router.replace("/profile/discounts")
				})}
				className="flex flex-col gap-5 px-4 pb-6"
			>
				<TextField
					label="Jméno"
					value={form.values.firstName}
					onValueChange={value => form.setValue("firstName", value)}
					onBlur={() => form.blur("firstName")}
					error={form.visibleError("firstName")}
				/>
				<TextField
					label="Příjmení"
					value={form.values.lastName}
					onValueChange={value => form.setValue("lastName", value)}
					onBlur={() => form.blur("lastName")}
					error={form.visibleError("lastName")}
				/>
				<TextField
					label="Rok narození"
					inputMode="numeric"
					placeholder="2017"
					value={form.values.birthYear}
					onValueChange={value =>
						form.setValue("birthYear", value.replace(/\D/g, "").slice(0, 4))
					}
					onBlur={() => form.blur("birthYear")}
					error={form.visibleError("birthYear")}
				/>
			</form>

			<SystemAlert
				open={confirmRemove}
				title="Odebrat dětský účet?"
				actions={[
					{
						label: "Zrušit",
						style: "cancel",
						onPress: () => setConfirmRemove(false),
					},
					{
						label: "Odebrat",
						style: "destructive",
						onPress: () => {
							removeKid(kidId)
							router.replace("/profile/discounts")
						},
					},
				]}
			/>
		</Screen>
	)
}
