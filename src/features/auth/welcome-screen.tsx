"use client"

import Image from "next/image"
import Link from "next/link"

import { Logo } from "@/components/brand/logo"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function WelcomeScreen() {
	return (
		<div className="dark relative flex h-full flex-col bg-background text-foreground">
			<div className="relative min-h-0 flex-1">
				<Image
					src="/photos/brno-climber.jpg"
					alt=""
					fill
					priority
					sizes="430px"
					className="object-cover"
				/>
				{/* Dark overlay for contrast, fading into the black panel. */}
				<div
					aria-hidden="true"
					className="absolute inset-0 bg-linear-to-b from-cod-gray/50 via-cod-gray/20 to-cod-gray"
				/>
				<div className="absolute inset-x-0 top-0 px-2 pt-safe">
					<Logo
						variant="primary"
						height={18}
						safeZone
						className="text-foreground"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-6 px-4 pt-2 pb-[calc(var(--safe-bottom)+1.5rem)]">
				<div>
					<h1 className="text-display">Let's HNG out</h1>
					<p className="mt-3 text-lead text-muted-foreground">
						Členství, permanentky a vstup do Hangaru v jednom telefonu.
					</p>
				</div>
				<div className="flex flex-col gap-3">
					<Link href="/sign-in" className={cn(buttonVariants({ size: "lg" }))}>
						Přihlásit se
					</Link>
					<Link
						href="/sign-up"
						className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
					>
						Vytvořit účet
					</Link>
				</div>
			</div>
		</div>
	)
}
