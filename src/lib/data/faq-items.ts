import type { FaqItem } from "@/lib/types/faq-item"

// From the first-visit FAQs on hangarbrno.cz/poprve-na-hangaru/ and
// hangarostrava.cz/nejcastejsi-otazky/ (identical apart from parking and
// public transport, which live on each branch's Contact section instead).
export const faqItems: FaqItem[] = [
	{
		question: "Proč se musím registrovat?",
		answer:
			"Registrací potvrzuješ, že znáš návštěvní řád, a bezpečnost je pro nás na prvním místě. Registruješ se jen jednou a vznikne ti zákaznický účet, přes který můžeš vložit depozit, koupit permanentku nebo členství. Online registrace ti ušetří čas na baru.",
		displayOrder: 1,
	},
	{
		question: "Platí moje registrace na obou pobočkách?",
		answer:
			"Bohužel ne. Každé centrum potřebuje z oficiálních důvodů vlastní registraci, takže se registruješ zvlášť v Brně a zvlášť v Ostravě. Hangar čip ale můžeš používat na obou pobočkách.",
		displayOrder: 2,
	},
	{
		question: "K čemu je Hangar čip?",
		answer:
			"Čip zrychlí každou další návštěvu: ukážeš ho na baru, obsluha ho naskenuje a hned vidí tvůj účet. Nechce se ti ho nosit? Stačí si vyfotit čárový kód do mobilu.",
		displayOrder: 3,
	},
	{
		question: "Co potřebuju na první návštěvu?",
		answer:
			"Pohodlné sportovní oblečení, lezečky a magnézium. Lezečky ti půjčíme, magnézium koupíš na baru za pár korun. A vezmi si ručník, budeš se potit!",
		displayOrder: 4,
	},
	{
		question: "Nemám lezečky. Můžu lézt v teniskách?",
		answer:
			"Lezečky ti rádi půjčíme, máme spoustu velikostí a po každém použití je dezinfikujeme. V jiných botách se ti nebude dobře lézt a můžeš poškodit chyty. Na boso se lézt nesmí.",
		displayOrder: 5,
	},
	{
		question: "Můžou lézt i děti?",
		answer:
			"Určitě, děti jsou obdivuhodní lezci! Dítě do 13 let ale musí být ve všech prostorách Hangaru pod neustálým dohledem rodiče nebo jiné dospělé osoby. Mladiství od 13 do 18 let potřebují pro samostatné lezení písemný souhlas zákonného zástupce.",
		displayOrder: 6,
	},
	{
		question: "Je vstupné celodenní?",
		answer: "Ano. I když přijdeš dopoledne, můžeš zůstat celý den.",
		displayOrder: 7,
	},
	{
		question: "Máte otevřeno i o víkendech a svátcích?",
		answer:
			"Ano, jsme tu každý den, o víkendech i svátcích. Jedinou výjimkou je Štědrý den.",
		displayOrder: 8,
	},
]
