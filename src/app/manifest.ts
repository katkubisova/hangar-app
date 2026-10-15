import type { MetadataRoute } from "next"

// Added to the home screen, the prototype opens without browser chrome:
// the recommended way to demo it on a phone.
export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "HANGAR",
		short_name: "HANGAR",
		description: "Klikací prototyp aplikace HANGARGYMS.",
		lang: "cs",
		start_url: "/",
		display: "standalone",
		orientation: "portrait",
		background_color: "#0d0d0d",
		theme_color: "#fafafa",
		icons: [
			{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
			{ src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
			{
				src: "/icons/icon-maskable-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	}
}
