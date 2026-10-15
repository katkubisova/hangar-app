import "@/app/globals.css"

import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { AppShell } from "@/components/shell/app-shell"
import { DeviceFrame } from "@/components/shell/device-frame"
import { OverlayProvider } from "@/components/shell/overlay"
import { DemoProvider } from "@/lib/demo/context"
import { cn } from "@/lib/utils"

const geist = Geist({
	subsets: ["latin", "latin-ext"],
	variable: "--font-sans",
})

const geistMono = Geist_Mono({
	variable: "--font-mono",
	subsets: ["latin", "latin-ext"],
})

export const metadata: Metadata = {
	title: "HANGAR",
	description: "Klikací prototyp aplikace HANGARGYMS.",
	applicationName: "HANGAR",
	// A client prototype: keep it out of search engines.
	robots: { index: false, follow: false },
	appleWebApp: {
		capable: true,
		title: "HANGAR",
		statusBarStyle: "default",
	},
	icons: { apple: "/icons/apple-touch-icon.png" },
	// Next only emits the newer "mobile-web-app-capable"; older iOS needs
	// the Apple name to open full-screen from the home screen.
	other: { "apple-mobile-web-app-capable": "yes" },
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
	themeColor: "#fafafa",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="cs" className={cn("font-sans", geist.variable)}>
			<body
				className={`${geist.variable} ${geistMono.variable} bg-cod-gray antialiased`}
			>
				<DemoProvider>
					<OverlayProvider>
						<DeviceFrame>
							<AppShell>{children}</AppShell>
						</DeviceFrame>
					</OverlayProvider>
				</DemoProvider>
			</body>
		</html>
	)
}
