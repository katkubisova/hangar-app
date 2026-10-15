import { brnoPrices, ostravaPrices } from "@/lib/data/price-lists"
import type { GymSlug } from "@/lib/types/gym"
import type { PriceCategory } from "@/lib/types/price-list"
import type {
	MembershipProduct,
	PackageProduct,
	PackageTimeWindow,
	Product,
	ProductAudience,
} from "@/lib/types/product"

// App products, built from the verified price lists so no price is typed
// twice. Mapping (agreed in step 1):
// - "Členství" table → memberships: Dospělý / Student / Rodič × 1, 3, 6
//   and 12 months. Assumption: the full price is charged up front and
//   renews at the end of the period until cancelled.
// - "Permanentky" table → packages: Dopoledne / Celý den × 10 or 20 entries,
//   valid 1 year. A null cell (not offered) makes no product.
// - Single entry and shoe rental are not sold in the app.

const MEMBERSHIP_CATEGORY = "Členství"
const PASS_CATEGORY = "Permanentky (10 / 20 vstupů)"

// Row order in both tables, matching price-lists.ts.
const MEMBERSHIP_ROWS: ProductAudience[] = ["adult", "student", "parent"]
const PASS_ROWS: ProductAudience[] = ["adult", "student", "reduced"]

const MEMBERSHIP_DURATIONS = [1, 3, 6, 12] as const
const PASS_COLUMNS = [
	{ timeWindow: "morning", entries: 10 },
	{ timeWindow: "morning", entries: 20 },
	{ timeWindow: "all-day", entries: 10 },
	{ timeWindow: "all-day", entries: 20 },
] as const

export const AUDIENCE_LABEL: Record<ProductAudience, string> = {
	adult: "Dospělý",
	student: "Student",
	parent: "Rodič",
	reduced: "Dítě / Senior / ZTP",
}

export const TIME_WINDOW_LABEL: Record<PackageTimeWindow, string> = {
	morning: "Dopoledne",
	"all-day": "Celý den",
}

const DURATION_LABEL: Record<MembershipProduct["durationMonths"], string> = {
	1: "1 měsíc",
	3: "3 měsíce",
	6: "6 měsíců",
	12: "12 měsíců",
}

function findTable(prices: PriceCategory[], category: string) {
	const table = prices.find(item => item.category === category)?.tables[0]
	if (!table) {
		throw new Error(`Price list has no "${category}" table`)
	}
	return table
}

function buildMemberships(
	gymSlug: GymSlug,
	prices: PriceCategory[]
): MembershipProduct[] {
	const table = findTable(prices, MEMBERSHIP_CATEGORY)
	return table.rows.flatMap((row, rowIndex) => {
		const audience = MEMBERSHIP_ROWS[rowIndex]
		return MEMBERSHIP_DURATIONS.flatMap((durationMonths, cellIndex) => {
			const price = row.cells[cellIndex]
			if (typeof price !== "number") {
				return []
			}
			return {
				id: `${gymSlug}-membership-${audience}-${durationMonths}m`,
				type: "membership",
				gymSlug,
				audience,
				name: `Členství ${AUDIENCE_LABEL[audience]}`,
				variant: DURATION_LABEL[durationMonths],
				price,
				durationMonths,
			}
		})
	})
}

function buildPackages(
	gymSlug: GymSlug,
	prices: PriceCategory[]
): PackageProduct[] {
	const table = findTable(prices, PASS_CATEGORY)
	return table.rows.flatMap((row, rowIndex) => {
		const audience = PASS_ROWS[rowIndex]
		return PASS_COLUMNS.flatMap(({ timeWindow, entries }, cellIndex) => {
			const price = row.cells[cellIndex]
			if (typeof price !== "number") {
				return []
			}
			return {
				id: `${gymSlug}-package-${audience}-${timeWindow}-${entries}`,
				type: "package",
				gymSlug,
				audience,
				name: `Permanentka ${TIME_WINDOW_LABEL[timeWindow]}`,
				variant: `${entries} vstupů · ${AUDIENCE_LABEL[audience]}`,
				price,
				entries,
				timeWindow,
				validityMonths: 12,
			}
		})
	})
}

export const products: Product[] = [
	...buildMemberships("brno", brnoPrices),
	...buildPackages("brno", brnoPrices),
	...buildMemberships("ostrava", ostravaPrices),
	...buildPackages("ostrava", ostravaPrices),
]

export function getProduct(id: string) {
	const product = products.find(item => item.id === id)
	if (!product) {
		throw new Error(`No product with id "${id}"`)
	}
	return product
}
