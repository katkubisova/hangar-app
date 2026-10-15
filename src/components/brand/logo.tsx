import { cn } from "@/lib/utils"

// Logo files in public/brand/logo/ are single-colour shapes. They're drawn
// as a CSS mask filled with currentColor, so the logo takes the text colour
// of wherever it's placed (black on light, Alabaster on dark).
const LOGOS = {
	// Primary: wordmark with the tagline, always to the right.
	primary: {
		src: "/brand/logo/hangar-full.svg",
		ratio: 832.72 / 111.02,
		minWidth: 120,
	},
	// Secondary: wordmark only, where the tagline isn't needed.
	secondary: { src: "/brand/logo/hangar.svg", ratio: 770 / 166, minWidth: 100 },
	// Symbol.
	hng: { src: "/brand/logo/hng.svg", ratio: 535.39 / 209.56, minWidth: 60 },
} as const

export type LogoVariant = keyof typeof LOGOS

interface LogoProps {
	variant?: LogoVariant
	// Height in px. Width follows the logo's proportions and never drops
	// below the brand's minimum width for that variant.
	height?: number
	// Adds the brand safe zone (50 % of the "H" height on every side).
	safeZone?: boolean
	label?: string
	className?: string
}

export function Logo({
	variant = "secondary",
	height = 24,
	safeZone = false,
	label = "Hangar",
	className,
}: LogoProps) {
	const logo = LOGOS[variant]
	const width = Math.max(height * logo.ratio, logo.minWidth)

	return (
		<span
			className={cn("inline-block shrink-0", className)}
			style={{ padding: safeZone ? height / 2 : undefined }}
		>
			<span
				role="img"
				aria-label={label}
				className="block bg-current"
				style={{
					width,
					height: width / logo.ratio,
					maskImage: `url(${logo.src})`,
					maskSize: "contain",
					maskRepeat: "no-repeat",
					maskPosition: "center",
				}}
			/>
		</span>
	)
}
