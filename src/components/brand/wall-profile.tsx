import { cn } from "@/lib/utils"

// The five climbing-wall profiles from the brand guide (p. 61–65). They're
// black shapes that carry key information (date, time, a short label) and
// give a layout structure. Drawn as a mask, so the fill comes from the
// text colour: use text-cod-gray (default look) or any palette colour.
//
// The shapes are irregular, so content doesn't go in the middle of the
// bounding box. Each profile has a "safe area": the largest rectangle that
// lies fully inside its fill, measured from the SVG outline and given as
// insets (top, right, bottom, left) in % of the shape's size.
const PROFILES = {
	nose: { ratio: 166.01 / 161.13, safe: [5, 5, 63, 25] },
	beast: { ratio: 248.86 / 146.03, safe: [8, 6, 38, 23] },
	monster: { ratio: 301.89 / 197.28, safe: [23, 38, 34, 11] },
	boomerang: { ratio: 236.67 / 156.84, safe: [13, 13, 36, 12] },
	stargate: { ratio: 195.85 / 207.83, safe: [29, 18, 18, 32] },
} as const

export type WallProfileName = keyof typeof PROFILES

interface WallProfileProps {
	profile: WallProfileName
	// Shows the profile's name, as in the guide's labelled versions.
	withName?: boolean
	className?: string
	// Content placed on top of the shape, e.g. a date on a poster. It sits
	// in the profile's safe area; keep it short so it fits there.
	children?: React.ReactNode
	contentClassName?: string
}

export function WallProfile({
	profile,
	withName = false,
	className,
	children,
	contentClassName,
}: WallProfileProps) {
	const src = `/brand/profiles/${profile}${withName ? "-name" : ""}.svg`

	return (
		<div
			className={cn("relative text-cod-gray", className)}
			style={{ aspectRatio: PROFILES[profile].ratio }}
		>
			<span
				aria-hidden="true"
				className="absolute inset-0 bg-current"
				style={{
					maskImage: `url(${src})`,
					maskSize: "contain",
					maskRepeat: "no-repeat",
					maskPosition: "center",
				}}
			/>
			{children && (
				<div
					className={cn(
						"absolute flex flex-col justify-center text-alabaster",
						contentClassName
					)}
					style={{ inset: safeArea(profile) }}
				>
					{children}
				</div>
			)}
		</div>
	)
}

function safeArea(profile: WallProfileName) {
	return PROFILES[profile].safe.map(inset => `${inset}%`).join(" ")
}
