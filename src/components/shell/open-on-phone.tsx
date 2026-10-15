"use client"

import { usePathname } from "next/navigation"
import { QRCodeSVG } from "qrcode.react"
import { useEffect, useState } from "react"

// QR code of the current page, next to the desktop frame, so the client
// can carry on on their own phone.
export function OpenOnPhone() {
	const pathname = usePathname()
	const [url, setUrl] = useState<string | null>(null)

	useEffect(() => {
		setUrl(`${window.location.origin}${pathname}`)
	}, [pathname])

	return (
		<div className="flex flex-col items-start gap-4 text-alabaster">
			<div className="size-[152px] bg-alabaster p-3">
				{url && (
					<QRCodeSVG
						value={url}
						size={128}
						bgColor="#fafafa"
						fgColor="#0d0d0d"
						title="QR kód této stránky"
					/>
				)}
			</div>
			<div>
				<p className="text-h3 font-medium tracking-heading uppercase">
					Otevřete na telefonu
				</p>
				<p className="mt-1 max-w-[220px] text-sm text-alabaster/60">
					Naskenujte kód fotoaparátem. Pak „Přidat na plochu“, aby se aplikace
					otevírala přes celou obrazovku.
				</p>
			</div>
		</div>
	)
}
