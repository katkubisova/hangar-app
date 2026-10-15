"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
	HomeIcon,
	MapIcon,
	QrcodeIcon,
	ShopIcon,
	UserIcon,
} from "@/components/ui/icons"
import { cn } from "@/lib/utils"

const TABS = [
	{ href: "/home", label: "Domů", Icon: HomeIcon },
	{ href: "/products", label: "Produkty", Icon: ShopIcon },
	{ href: "/qr", label: "Vstup", Icon: QrcodeIcon, emphasised: true },
	{ href: "/map", label: "Mapa", Icon: MapIcon },
	{ href: "/profile", label: "Profil", Icon: UserIcon },
] as const

// Bottom tab bar. Vstup (the check-in QR) sits in the middle as a black
// square button: accents can't be large fills, so emphasis comes from
// black. The active tab gets an Electric Violet bar, never an underline.
export function TabBar() {
	const pathname = usePathname()

	return (
		<nav
			aria-label="Hlavní navigace"
			className="shrink-0 border-t bg-background pb-safe"
		>
			<ul className="grid h-[58px] grid-cols-5">
				{TABS.map(({ href, label, Icon, ...tab }) => {
					const isActive = pathname === href || pathname.startsWith(`${href}/`)
					const emphasised = "emphasised" in tab
					return (
						<li key={href}>
							<Link
								href={href}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"relative flex h-full flex-col items-center justify-center gap-1 text-[11px] leading-none font-medium transition-colors active:opacity-60",
									isActive ? "text-foreground" : "text-muted-foreground"
								)}
							>
								{isActive && !emphasised && (
									<span
										aria-hidden="true"
										className="absolute inset-x-4 top-0 h-0.5 bg-electric-violet"
									/>
								)}
								{emphasised ? (
									<span
										className={cn(
											"flex size-11 items-center justify-center bg-primary text-primary-foreground",
											isActive &&
												"outline-2 outline-offset-2 outline-electric-violet"
										)}
									>
										<Icon className="size-6" aria-hidden="true" />
										<span className="sr-only">{label}</span>
									</span>
								) : (
									<>
										<Icon className="size-6" aria-hidden="true" />
										{label}
									</>
								)}
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
