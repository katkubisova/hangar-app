import type { AppNotification } from "@/lib/types/app-notification"
import type { DemoScenarioId } from "@/lib/types/demo-scenario"
import type { DiscountCard } from "@/lib/types/discount-card"
import type { Entry } from "@/lib/types/entry"
import type { GymSlug } from "@/lib/types/gym"
import type { KidAccount } from "@/lib/types/kid-account"
import type { OwnedProduct } from "@/lib/types/owned-product"
import type { PaymentCard } from "@/lib/types/payment-card"
import type { PermissionState } from "@/lib/types/permission-state"
import type { Purchase } from "@/lib/types/purchase"
import type { SystemFlags } from "@/lib/types/system-flags"
import type { UserProfile } from "@/lib/types/user-profile"

// Everything the prototype remembers between visits (localStorage).
export interface DemoState {
	scenario: DemoScenarioId
	isLoggedIn: boolean
	user: UserProfile | null
	selectedGym: GymSlug
	ownedProducts: OwnedProduct[]
	purchases: Purchase[]
	entries: Entry[]
	paymentCards: PaymentCard[]
	kids: KidAccount[]
	discountCards: DiscountCard[]
	notifications: AppNotification[]
	system: SystemFlags
	permissions: {
		push: PermissionState
		location: PermissionState
	}
}
