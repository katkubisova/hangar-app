"use client"

import { useState } from "react"

type Errors<T> = Partial<Record<keyof T, string | undefined>>

// Minimal form state with inline validation: a field shows its error once
// it has been left (blur) or after the first submit attempt.
export function useForm<T extends Record<string, string | boolean>>(
	initialValues: T,
	validate: (values: T) => Errors<T>
) {
	const [values, setValues] = useState(initialValues)
	const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
	const [submitted, setSubmitted] = useState(false)

	const errors = validate(values)
	const isValid = Object.values(errors).every(error => !error)

	function visibleError(field: keyof T) {
		return submitted || touched[field] ? errors[field] : undefined
	}

	function setValue<K extends keyof T>(field: K, value: T[K]) {
		setValues(current => ({ ...current, [field]: value }))
	}

	function blur(field: keyof T) {
		setTouched(current => ({ ...current, [field]: true }))
	}

	// Runs onValid only when every field passes; otherwise shows all errors.
	function handleSubmit(onValid: (values: T) => void) {
		return (event: React.FormEvent) => {
			event.preventDefault()
			setSubmitted(true)
			if (isValid) {
				onValid(values)
			}
		}
	}

	return { values, setValue, blur, visibleError, handleSubmit }
}
