"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

import {
	WallProfile,
	type WallProfileName,
} from "@/components/brand/wall-profile"
import { Button } from "@/components/ui/button"
import {
	CardmembershipIcon,
	LocationIcon,
	QrcodeIcon,
} from "@/components/ui/icons"
import { cn } from "@/lib/utils"

const SLIDES: {
	title: string
	text: string
	profile: WallProfileName
	Icon: typeof QrcodeIcon
}[] = [
	{
		title: "Vstup přes QR",
		text: "Ukaž QR kód z aplikace při vstupu a jdi lézt.",
		profile: "nose",
		Icon: QrcodeIcon,
	},
	{
		title: "Členství v telefonu",
		text: "Kup si členství nebo permanentku a měj přehled, kolik ti zbývá.",
		profile: "beast",
		Icon: CardmembershipIcon,
	},
	{
		title: "Najdi svůj Hangar",
		text: "Brno, Ostrava a brzy další města. Otevírací doba i cesta k nám na pár klepnutí.",
		profile: "stargate",
		Icon: LocationIcon,
	},
]

const NEXT_STEP = "/onboarding/notifications"

// Swipeable intro after sign-up. Native scroll snapping does the swiping;
// the button moves one slide on.
export function OnboardingScreen() {
	const router = useRouter()
	const trackRef = useRef<HTMLDivElement>(null)
	const [index, setIndex] = useState(0)
	const isLast = index === SLIDES.length - 1

	function goTo(next: number) {
		const track = trackRef.current
		track?.scrollTo({ left: next * track.clientWidth, behavior: "smooth" })
	}

	return (
		<div className="flex h-full flex-col bg-background pt-safe duration-200 animate-in fade-in-0">
			<div className="flex h-12 shrink-0 items-center justify-end px-2">
				{!isLast && (
					<Link
						href={NEXT_STEP}
						className="flex h-11 items-center px-3 text-base font-medium text-muted-foreground active:opacity-60"
					>
						Přeskočit
					</Link>
				)}
			</div>

			<div
				ref={trackRef}
				onScroll={event => {
					const track = event.currentTarget
					setIndex(Math.round(track.scrollLeft / track.clientWidth))
				}}
				className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-none"
			>
				{SLIDES.map(({ title, text, profile, Icon }, slideIndex) => (
					<section
						key={title}
						aria-label={`${slideIndex + 1} z ${SLIDES.length}`}
						className="flex w-full shrink-0 snap-center flex-col justify-center px-6"
					>
						<WallProfile
							profile={profile}
							className="mx-auto w-[78%]"
							contentClassName="items-center"
						>
							<Icon className="size-16" aria-hidden="true" />
						</WallProfile>
						<h1 className="mt-10 text-h1">{title}</h1>
						<p className="mt-3 text-lead text-muted-foreground">{text}</p>
					</section>
				))}
			</div>

			<div className="flex shrink-0 flex-col gap-5 px-6 pt-4 pb-[calc(var(--safe-bottom)+1rem)]">
				<div className="flex gap-2" aria-hidden="true">
					{SLIDES.map((slide, slideIndex) => (
						<span
							key={slide.title}
							className={cn(
								"h-1.5 transition-all",
								slideIndex === index
									? "w-6 bg-electric-violet"
									: "w-1.5 bg-input"
							)}
						/>
					))}
				</div>
				<Button
					size="lg"
					onClick={() => (isLast ? router.push(NEXT_STEP) : goTo(index + 1))}
				>
					{isLast ? "Začít" : "Další"}
				</Button>
			</div>
		</div>
	)
}
