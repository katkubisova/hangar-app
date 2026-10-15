import { WallProfile } from "@/components/brand/wall-profile"
import { DemoPanel } from "@/components/demo/demo-panel"
import { OpenOnPhone } from "@/components/shell/open-on-phone"
import { HomeIndicator, StatusBar } from "@/components/shell/status-bar"

// Below 640 px the app fills the screen (up to 430 px wide). From 640 px
// up it sits in a 390 × 844 phone frame on a branded background, with the
// "open on phone" QR and the demo panel beside it. Pure CSS, so the server
// and the phone render the same markup.
//
// On a short laptop screen the frame loses height (never width) so the
// whole app, tab bar included, stays visible without scrolling.
//
// Inside the frame, the safe areas are set to the iPhone's status bar and
// home indicator, so the app lays out exactly as on a phone.
export function DeviceFrame({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex h-dvh justify-center overflow-hidden bg-cod-gray sm:h-auto sm:min-h-dvh sm:flex-wrap sm:items-center sm:gap-x-16 sm:gap-y-10 sm:overflow-visible sm:px-6 sm:py-5">
			<WallProfile
				profile="monster"
				className="pointer-events-none absolute -bottom-24 -left-24 hidden w-[640px] text-[#161616] sm:block"
			/>

			<div className="relative order-2 hidden w-[240px] sm:block">
				<OpenOnPhone />
			</div>

			<div className="relative order-3 h-full w-full max-w-[430px] sm:h-[min(844px,calc(100dvh-2.5rem))] sm:w-[390px] sm:shrink-0 sm:rounded-[55px] sm:bg-black sm:p-[11px] sm:shadow-2xl sm:ring-1 sm:ring-white/15 sm:[--safe-bottom:34px] sm:[--safe-top:47px]">
				{/* Rounded corners here are the device, not our UI. */}
				<div className="relative h-full overflow-hidden sm:rounded-[44px]">
					<StatusBar />
					{children}
					<HomeIndicator />
				</div>
			</div>

			<div className="relative order-4 hidden sm:block">
				<DemoPanel variant="desktop" />
			</div>
		</div>
	)
}
