import { TabBar } from "@/components/shell/tab-bar"
import { RequireLogin } from "@/features/auth/require-login"

export default function TabsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<RequireLogin>
			<div className="flex min-h-0 flex-1 flex-col">{children}</div>
			<TabBar />
		</RequireLogin>
	)
}
