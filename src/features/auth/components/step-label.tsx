// "Krok 1 ze 2" above a multi-step form.
export function StepLabel({ step, of }: { step: number; of: number }) {
	return (
		<p className="eyebrow px-4 pb-1">
			Krok {step} ze {of}
		</p>
	)
}
