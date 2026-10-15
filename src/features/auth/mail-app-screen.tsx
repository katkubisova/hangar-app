"use client"

import Image from "next/image"
import Link from "next/link"

import { Logo } from "@/components/brand/logo"
import { SimulatedTag } from "@/components/shell/simulated-tag"
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeftIcon } from "@/components/ui/icons"
import { useAuthDraft } from "@/features/auth/auth-draft"
import { cn } from "@/lib/utils"

// Simulated mail app showing the password-reset e-mail. The app chrome is
// generic phone UI (system font); the e-mail itself is Hangar-branded.
export function MailAppScreen() {
	const { draft } = useAuthDraft()
	const now = new Date()
	const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`

	return (
		<div className="flex h-full flex-col bg-white pt-safe text-black duration-200 animate-in fade-in-0 slide-in-from-right-8">
			<div className="flex h-12 shrink-0 items-center justify-between px-2 font-system">
				<Link
					href="/forgot-password/sent"
					className="flex h-11 items-center gap-0.5 pr-3 text-[17px] text-[#007aff] active:opacity-60"
				>
					<ChevronLeftIcon className="size-7" aria-hidden="true" />
					Doručené
				</Link>
				<SimulatedTag className="mr-2" />
			</div>

			<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-none">
				<div className="border-b border-black/10 px-4 pb-4 font-system">
					<p className="text-[22px] leading-tight font-bold">
						Nastav si nové heslo
					</p>
					<div className="mt-3 flex items-center gap-3">
						<Image
							src="/icons/icon-192.png"
							alt=""
							width={40}
							height={40}
							className="size-10 rounded-full"
						/>
						<div className="min-w-0 flex-1 text-[15px] leading-snug">
							<p className="flex justify-between gap-2">
								<span className="font-semibold">Hangar</span>
								<span className="text-black/50">{time}</span>
							</p>
							<p className="truncate text-black/50">
								Komu: {draft.email || "tereza.svobodova@example.cz"}
							</p>
						</div>
					</div>
				</div>

				{/* The e-mail body, in Hangar's brand. */}
				<div className="m-4 bg-alabaster p-6 font-sans text-cod-gray">
					<Logo variant="secondary" height={22} className="text-cod-gray" />
					<p className="mt-8 text-h2 font-bold tracking-heading uppercase">
						Nové heslo
					</p>
					<p className="mt-3">
						Ahoj, někdo (snad ty) požádal o nové heslo k účtu v aplikaci Hangar.
						Klepni na tlačítko a nastav si ho.
					</p>
					<Link
						href="/reset-password"
						className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
					>
						Nastavit nové heslo
					</Link>
					<p className="mt-6 text-sm text-[#5c5c5c]">
						Odkaz platí 24 hodin. Pokud jsi o nové heslo nežádal(a), e-mail
						klidně ignoruj.
					</p>
				</div>
			</div>
		</div>
	)
}
