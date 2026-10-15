// A footnote marker as shown on the source price list, e.g. "1" or "**".
export type FootnoteMarker = string

export interface PriceLabelPart {
	text: string
	marker?: FootnoteMarker
}

// A plain string, or parts when the label carries footnote markers —
// e.g. "Dítě² / Senior³" is two parts, each with its own marker.
export type PriceLabel = string | PriceLabelPart[]

// A number is a price in CZK (formatted as "1 940 Kč"), a string is shown
// as-is (e.g. "15 %" or "1 měsíc"), and null means "not offered" ("–").
export type PriceCell = number | string | null

export interface PriceRow {
	label: PriceLabel
	cells: PriceCell[]
}

export interface PriceTable {
	// The first column is the row-label column; the rest line up with
	// each row's cells.
	columns: PriceLabel[]
	rows: PriceRow[]
}

export interface PriceFootnote {
	marker: FootnoteMarker
	text: string
}

export interface PriceCategory {
	category: string
	tables: PriceTable[]
	footnotes?: PriceFootnote[]
	notes?: string[]
}
