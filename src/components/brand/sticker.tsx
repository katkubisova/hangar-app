import { useId } from "react"

import { cn } from "@/lib/utils"

interface StickerProps {
	// Runs around the edge, repeated to fill the circle.
	text?: string
	// Centre of the sticker: an icon or a short word that changes with the
	// topic (location, time, race, talk).
	children?: React.ReactNode
	className?: string
}

// Round brand sticker (guide p. 66): text circles the edge, the centre
// holds an icon. Colours come from the text and background classes, so it
// works on every palette colour and gradient.
export function Sticker({
	text = "Let's HNG out",
	children,
	className,
}: StickerProps) {
	const pathId = useId()
	// The ring fits about 39 characters at this size; repeat the text as
	// many times as fits, then spread it evenly around the circle.
	const repeats = Math.max(1, Math.floor(39 / (text.length + 3)))
	const ring = Array.from({ length: repeats }, () => text).join(" • ")

	return (
		<div
			className={cn(
				"relative grid aspect-square w-32 place-items-center rounded-full bg-cod-gray text-alabaster",
				className
			)}
		>
			<svg
				viewBox="0 0 100 100"
				className="absolute inset-0 size-full"
				aria-hidden="true"
			>
				<defs>
					<path
						id={pathId}
						d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
					/>
				</defs>
				<text
					className="fill-current text-[9px] font-medium uppercase"
					style={{ letterSpacing: "0.08em" }}
				>
					<textPath href={`#${pathId}`} textLength="236">
						{ring} •
					</textPath>
				</text>
			</svg>
			<span className="sr-only">{text}</span>
			<div className="relative grid size-1/2 place-items-center">
				{children}
			</div>
		</div>
	)
}
