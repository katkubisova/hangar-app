import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

const NBSP = " "

// Formats a CZK amount the way the branch price lists show it: "1 940 Kč".
// Non-breaking spaces keep the amount on one line.
export function formatPrice(amount: number) {
	const digits = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)
	return `${digits}${NBSP}Kč`
}

// "14. 2. 2027", the Czech short date.
export function formatDate(iso: string) {
	const date = new Date(iso)
	return `${date.getDate()}.${NBSP}${date.getMonth() + 1}.${NBSP}${date.getFullYear()}`
}
