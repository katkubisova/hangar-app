import Image from "next/image"
import { ImageIcon } from "@/components/ui/icons"

import { cn } from "@/lib/utils"

export type BrandGradient =
	| "violet-trinidad"
	| "violet-orient"
	| "orient-trinidad"
	| "soft-violet"
	| "soft-orange"
	| "soft-blue"
	| "pastel-violet"
	| "pastel-orange"
	| "pastel-blue"

const GRADIENT_CLASS: Record<BrandGradient, string> = {
	"violet-trinidad": "bg-gradient-violet-trinidad",
	"violet-orient": "bg-gradient-violet-orient",
	"orient-trinidad": "bg-gradient-orient-trinidad",
	"soft-violet": "bg-gradient-soft-violet",
	"soft-orange": "bg-gradient-soft-orange",
	"soft-blue": "bg-gradient-soft-blue",
	"pastel-violet": "bg-gradient-pastel-violet",
	"pastel-orange": "bg-gradient-pastel-orange",
	"pastel-blue": "bg-gradient-pastel-blue",
}

interface BrandImageProps {
	// Without a photo, the gradient and label stand in for it.
	src?: string
	alt: string
	// Brand treatment: black-and-white photo under the gradient at 80 %
	// opacity (guide p. 44 asks for 80–90 %). Without a gradient the photo
	// shows in full colour.
	gradient?: BrandGradient
	aspectRatio?: string
	sizes?: string
	priority?: boolean
	className?: string
}

export function BrandImage({
	src,
	alt,
	gradient,
	aspectRatio = "aspect-video",
	sizes = "(min-width: 1024px) 50vw, 100vw",
	priority = false,
	className,
}: BrandImageProps) {
	return (
		<div
			className={cn(
				"relative isolate overflow-hidden bg-muted",
				aspectRatio,
				className
			)}
		>
			{src && (
				<Image
					src={src}
					alt={alt}
					fill
					sizes={sizes}
					priority={priority}
					className={cn("object-cover", gradient && "grayscale")}
				/>
			)}
			{gradient && (
				<div
					aria-hidden="true"
					className={cn(
						"absolute inset-0",
						src && "opacity-80",
						GRADIENT_CLASS[gradient]
					)}
				/>
			)}
			{!src && (
				<div
					role="img"
					aria-label={alt}
					className={cn(
						"absolute inset-0 flex items-end gap-2 p-4 text-sm font-medium",
						gradient ? "text-alabaster" : "text-muted-foreground"
					)}
				>
					<ImageIcon aria-hidden="true" className="size-5 shrink-0" />
					<span>{alt}</span>
				</div>
			)}
		</div>
	)
}
