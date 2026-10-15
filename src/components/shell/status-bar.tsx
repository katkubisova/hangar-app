// Fake iOS status bar, shown only inside the desktop phone frame (a real
// phone has its own). mix-blend-difference keeps it readable on both the
// light and the black screens.
export function StatusBar() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-x-0 top-0 z-50 hidden h-[47px] items-center justify-between px-8 pt-1 font-system text-[15px] font-semibold text-white mix-blend-difference sm:flex"
		>
			<span className="w-14 text-center">9:41</span>
			<span className="h-[30px] w-[110px] rounded-full bg-black" />
			<span className="flex w-14 items-center justify-end gap-1.5">
				<svg
					aria-hidden="true"
					width="18"
					height="11"
					viewBox="0 0 18 11"
					fill="currentColor"
				>
					<rect x="0" y="7" width="3" height="4" rx="0.5" />
					<rect x="5" y="5" width="3" height="6" rx="0.5" />
					<rect x="10" y="2.5" width="3" height="8.5" rx="0.5" />
					<rect x="15" y="0" width="3" height="11" rx="0.5" />
				</svg>
				<svg
					aria-hidden="true"
					width="25"
					height="12"
					viewBox="0 0 25 12"
					fill="none"
				>
					<rect
						x="0.5"
						y="0.5"
						width="21"
						height="11"
						rx="3"
						stroke="currentColor"
						opacity="0.4"
					/>
					<rect
						x="2"
						y="2"
						width="18"
						height="8"
						rx="1.5"
						fill="currentColor"
					/>
					<rect
						x="23"
						y="4"
						width="1.5"
						height="4"
						rx="0.5"
						fill="currentColor"
						opacity="0.4"
					/>
				</svg>
			</span>
		</div>
	)
}

export function HomeIndicator() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-x-0 bottom-2 z-50 hidden justify-center mix-blend-difference sm:flex"
		>
			<span className="h-[5px] w-[134px] rounded-full bg-white" />
		</div>
	)
}
