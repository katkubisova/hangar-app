import type {
	PriceCategory,
	PriceLabel,
	PriceTable,
} from "@/lib/types/price-list"
import { formatPrice } from "@/lib/utils"

// Real price lists, verified against the live sites on 15 Oct 2026:
// - Brno: https://hangarbrno.cz/cenik/
// - Ostrava: https://hangarostrava.cz/cenik/
// Copied from hangar-web (Czech side only). Both branches share one
// structure and wording so they're easy to compare. Where they differ
// (prices, emails, accepted cards), the difference is real; don't
// harmonise it. Don't change any price without re-verifying it on the
// live sites. App products are built from these tables (products.ts).

const PASS_COLUMNS: PriceLabel[] = [
	"Kategorie",
	"Dopoledne 10",
	"Dopoledne 20",
	"Celý den 10",
	"Celý den 20",
]

const ONE_MONTH = "1 měsíc"
const THREE_MONTHS = "3 měsíce"
const SIX_MONTHS = "6 měsíců"
const TWELVE_MONTHS = "12 měsíců"

const MEMBERSHIP_COLUMNS: PriceLabel[] = [
	"Kategorie",
	ONE_MONTH,
	THREE_MONTHS,
	SIX_MONTHS,
	TWELVE_MONTHS,
]

// Identical on both branches' source pages.
const MEMBERSHIP_INCLUDED_TABLE: PriceTable = {
	columns: [
		"Členství",
		[{ text: "Sleva na vstup", marker: "*" }],
		"Sleva na baru",
		[{ text: "Členské lekce", marker: "**" }],
		[{ text: "Přerušení", marker: "***" }],
	],
	rows: [
		{ label: ONE_MONTH, cells: ["15 %", null, null, null] },
		{ label: THREE_MONTHS, cells: ["20 %", "10 %", "1", ONE_MONTH] },
		{ label: SIX_MONTHS, cells: ["25 %", "12 %", "2", ONE_MONTH] },
		{ label: TWELVE_MONTHS, cells: ["30 %", "15 %", "4", ONE_MONTH] },
	],
}

const RENTAL_COLUMNS: PriceLabel[] = ["Položka", "Dospělý", "Dítě"]

const ADULT = "Dospělý"
const STUDENT = "Student"
const PARENT = "Rodič"
// Both Czech source pages include ZTP in the passes' reduced row.
const PASS_REDUCED = "Dítě / Senior / ZTP"

const SINGLE_ENTRY_ROWS_LABELS = {
	student: [{ text: "Student", marker: "1" }],
	childSenior: [
		{ text: "Dítě", marker: "2" },
		{ text: " / Senior", marker: "3" },
	],
	ztp: "ZTP",
	family: [{ text: "Rodinné vstupné", marker: "4" }],
	accompanying: "Doprovod",
}

function studentFootnote(consentEmail: string) {
	return {
		marker: "1",
		text: `Student: 13–26 let. Nutná registrace a vlastní zákaznický účet. Studenti SŠ a VŠ se prokazují platným průkazem ISIC nebo potvrzením o studiu. Studenti ve věku 13–18 let, kteří přijdou bez zákonného zástupce nebo osoby starší 18 let, jež za ně přebírá odpovědnost, musí donést nebo poslat na ${consentEmail} podepsaný souhlas zákonného zástupce (neúplný nebo nepodepsaný formulář nepřijímáme).`,
	}
}

function childFootnote(accompanyingFee: number) {
	const fee = formatPrice(accompanyingFee)
	return {
		marker: "2",
		text: `Dítě: 0–12 let, v prostoru stěny jen pod dohledem zákonného zástupce nebo osoby starší 18 let, která za dítě přebírá odpovědnost. Max. 3 děti na 1 dospělého v dětských prostorech (dětský pohybový park, dětské tréninkové zóny), max. 2 na hlavní lezecké stěně. Děti 0–1 rok zdarma. Do 6 let zdarma s platící dospělou osobou; každé další dítě platí dětské vstupné. Při platbě pouze dětského vstupného se platí poplatek za doprovod (${fee}).`,
	}
}

const SENIOR_FOOTNOTE = {
	marker: "3",
	text: "Senior: aktivní senioři nad 65 let.",
}
const FAMILY_FOOTNOTE = {
	marker: "4",
	text: "Rodinné vstupné: 2 dospělí + 2 děti.",
}
const ZTP_NOTE = "ZTP: doprovod má vstup zdarma."
const BAREFOOT_NOTE =
	"Na boso se lézt nesmí: lez v lezečkách (vlastních nebo půjčených) nebo v čisté obuvi."

function membershipFootnotes(pauseEmail: string) {
	return [
		{
			marker: "*",
			text: "Výpočet při odhadované návštěvě 2× týdně.",
		},
		{
			marker: "**",
			text: "Členská lekce je lekce s instruktorem zdarma pro členy. Info o lekcích přijde e-mailem v blízkých dnech po zakoupení, termíny s dostatečným předstihem.",
		},
		{
			marker: "***",
			text: `Přerušení jednou, na jeden souvislý měsíc, bez udání důvodu. Žádosti posílej na ${pauseEmail}.`,
		},
	]
}

const MEMBERSHIP_NOTES = [
	"Neomezené vstupy po celý den u všech členství.",
	"Členství Dospělý: 1 dítě do 6 let zdarma. Členství Rodič: 1 dítě do 12 let a druhé do 6 let zdarma.",
	"Platba: přijímáme FKSP, Benefit Plus a Múza Pay.",
]

function multisportNote(supplement: number) {
	const fee = formatPrice(supplement)
	return `Přijímáme kartu Multisport (Stříbrná, Dítě, FKSP). Při návštěvě delší než 1 hodina doplatek ${fee} (jen u dospělého vstupného).`
}

const EXACT_AMOUNT_RULE =
	"Při platbě objednávkou dobij přesnou částku: bar nemůže vracet přebytek ani přijímat doplatky v hotovosti či kartou."

function singleEntryPaymentNote(cards: string) {
	return `Platba: ${cards} lze použít na jednotlivé vstupy, doplatek k Multisportu, permanentky, členství a půjčovné lezeček. ${EXACT_AMOUNT_RULE}`
}

function groupsNote(email: string) {
	return `Skupiny nad 10 osob: ohlaste návštěvu alespoň 7 dní předem na ${email} (platí i pro školy a teambuildingy). Neohlášená skupina nemusí být při velkém vytížení vpuštěna do lezeckých prostor.`
}

const PASS_PAYMENT_NOTE = "Platba: přijímáme FKSP, Benefit Plus a Múza Pay."

const SINGLE_ENTRY = "Jednorázové vstupné"
const PASSES = "Permanentky (10 / 20 vstupů)"
const MEMBERSHIP = "Členství"
const RENTAL = "Půjčovna"
const CLIMBING_SHOES = "Lezečky"

export const brnoPrices: PriceCategory[] = [
	{
		category: SINGLE_ENTRY,
		tables: [
			{
				columns: [
					"Kategorie",
					"Všední dny 8:00–15:00",
					"Všední dny 15:00–22:00, víkendy a svátky",
				],
				rows: [
					{ label: ADULT, cells: [215, 265] },
					{ label: SINGLE_ENTRY_ROWS_LABELS.student, cells: [175, 210] },
					{ label: SINGLE_ENTRY_ROWS_LABELS.childSenior, cells: [130, 130] },
					{ label: SINGLE_ENTRY_ROWS_LABELS.ztp, cells: [130, 130] },
					{ label: SINGLE_ENTRY_ROWS_LABELS.family, cells: [625, 705] },
					{ label: SINGLE_ENTRY_ROWS_LABELS.accompanying, cells: [110, 110] },
				],
			},
		],
		footnotes: [
			studentFootnote("hangarbrno@gmail.com"),
			childFootnote(110),
			SENIOR_FOOTNOTE,
			FAMILY_FOOTNOTE,
		],
		notes: [
			ZTP_NOTE,
			multisportNote(110),
			singleEntryPaymentNote("Benefit Plus a Múza Pay"),
			groupsNote("lucie@hangarbrno.cz"),
		],
	},
	{
		category: PASSES,
		tables: [
			{
				columns: PASS_COLUMNS,
				rows: [
					{ label: ADULT, cells: [1940, 3590, 2400, 4440] },
					{ label: STUDENT, cells: [1570, 2950, 1890, 3550] },
					{ label: PASS_REDUCED, cells: [null, null, 1210, 2110] },
				],
			},
		],
		notes: ["Platnost 1 rok, vstupy jsou přenosné.", PASS_PAYMENT_NOTE],
	},
	{
		category: MEMBERSHIP,
		tables: [
			{
				columns: MEMBERSHIP_COLUMNS,
				rows: [
					{ label: ADULT, cells: [1950, 5510, 10340, 19290] },
					// The Czech page shows 15 920 Kč for Student / 12 months, the
					// English page 15 290 Kč. Kept at 15 290 pending the client's
					// confirmation — flagged in the Phase 1 PR.
					{ label: STUDENT, cells: [1550, 4370, 8190, 15290] },
					{ label: PARENT, cells: [2740, 7700, 14380, 26700] },
				],
			},
			MEMBERSHIP_INCLUDED_TABLE,
		],
		footnotes: membershipFootnotes("info@hangarbrno.cz"),
		notes: MEMBERSHIP_NOTES,
	},
	{
		category: RENTAL,
		tables: [
			{
				columns: RENTAL_COLUMNS,
				rows: [{ label: CLIMBING_SHOES, cells: [80, 40] }],
			},
		],
		notes: [BAREFOOT_NOTE],
	},
]

export const ostravaPrices: PriceCategory[] = [
	{
		category: SINGLE_ENTRY,
		tables: [
			{
				columns: [
					"Kategorie",
					"Všední dny do 15:00",
					"Všední dny od 15:00, víkendy a svátky",
				],
				rows: [
					{ label: ADULT, cells: [210, 260] },
					{ label: SINGLE_ENTRY_ROWS_LABELS.student, cells: [170, 205] },
					{ label: SINGLE_ENTRY_ROWS_LABELS.childSenior, cells: [125, 125] },
					{ label: SINGLE_ENTRY_ROWS_LABELS.ztp, cells: [125, 125] },
					{ label: SINGLE_ENTRY_ROWS_LABELS.family, cells: [610, 690] },
					{ label: SINGLE_ENTRY_ROWS_LABELS.accompanying, cells: [105, 105] },
				],
			},
		],
		footnotes: [
			studentFootnote("hangarostrava@gmail.com"),
			childFootnote(105),
			SENIOR_FOOTNOTE,
			FAMILY_FOOTNOTE,
		],
		notes: [
			ZTP_NOTE,
			multisportNote(110),
			singleEntryPaymentNote("Benefit Plus"),
			groupsNote("honza@hangarostrava.cz"),
		],
	},
	{
		category: PASSES,
		tables: [
			{
				columns: PASS_COLUMNS,
				rows: [
					{ label: ADULT, cells: [1900, 3520, 2350, 4350] },
					{ label: STUDENT, cells: [1540, 2890, 1850, 3480] },
					{ label: PASS_REDUCED, cells: [null, null, 1180, 2060] },
				],
			},
		],
		notes: [
			"Platnost 1 rok od zakoupení, vstupy jsou přenosné.",
			PASS_PAYMENT_NOTE,
		],
	},
	{
		category: MEMBERSHIP,
		tables: [
			{
				columns: MEMBERSHIP_COLUMNS,
				rows: [
					{ label: ADULT, cells: [1920, 5410, 10140, 18930] },
					{ label: STUDENT, cells: [1510, 4260, 8000, 14920] },
					{ label: PARENT, cells: [2670, 7510, 14010, 26030] },
				],
			},
			MEMBERSHIP_INCLUDED_TABLE,
		],
		footnotes: membershipFootnotes("info@hangarostrava.cz"),
		notes: MEMBERSHIP_NOTES,
	},
	{
		category: RENTAL,
		tables: [
			{
				columns: RENTAL_COLUMNS,
				rows: [{ label: CLIMBING_SHOES, cells: [80, 40] }],
			},
		],
		notes: [BAREFOOT_NOTE],
	},
]
