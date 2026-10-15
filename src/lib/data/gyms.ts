import { brnoPrices, ostravaPrices } from "@/lib/data/price-lists"
import type { Gym, GymSlug, OpenGym } from "@/lib/types/gym"

// Brno and Ostrava: facts copied from hangar-web's gyms.ts (verified there
// against hangarbrno.cz and hangarostrava.cz on 15 Oct 2026), Czech only
// and trimmed to what the app shows. Opening hours are the same as on the
// sites, split into weekdays so the app can tell "open today" and "open
// now". Coordinates: OpenStreetMap geocoding of the street addresses.
//
// Praha, Plzeň and Olomouc are announced but have no address yet. Their
// pins sit on the city centre as a stand-in (assumption, see the PR).

export const gyms: Gym[] = [
	{
		name: "Hangar Brno",
		slug: "brno",
		city: "Brno",
		status: "open",
		coordinates: { lat: 49.16762, lng: 16.60181 },
		heroImage: {
			src: "/photos/brno-hall-b.jpg",
			alt: "Boulderová stěna plná chytů v Hangaru Brno",
		},
		galleryImages: [
			{ src: "/photos/brno-hall-a.jpg", alt: "Boulderová hala shora" },
			{
				src: "/photos/brno-overhang.jpg",
				alt: "Převislý boulder uprostřed haly",
			},
			{ src: "/photos/brno-climber.jpg", alt: "Lezkyně na barevné stěně" },
			{
				src: "/photos/brno-routesetting.jpg",
				alt: "Stavěči při stavění nových boulderů",
			},
			{ src: "/photos/brno-kids-park.jpg", alt: "Pohybový park pro děti" },
			{ src: "/photos/brno-shop.jpg", alt: "Outdoor shop" },
		],
		shortDescription:
			"Dvě haly, přes 200 boulderů a tréninkové zóny, ve kterých se nikdo nenudí. Tady to v roce 2019 celé začalo.",
		address: "Pražákova 1027/53, 619 00 Brno",
		openingHours: [
			{ label: "Pondělí", days: [1], opens: "9:00", closes: "22:00" },
			{
				label: "Úterý–pátek",
				days: [2, 3, 4, 5],
				opens: "7:00",
				closes: "22:00",
			},
			{
				label: "Sobota–neděle",
				days: [6, 7],
				opens: "9:00",
				closes: "22:00",
			},
		],
		email: "info@hangarbrno.cz",
		phone: "+420 608 987 910",
		prices: brnoPrices,
		displayOrder: 1,
	},
	{
		name: "Hangar Ostrava",
		slug: "ostrava",
		city: "Ostrava",
		status: "open",
		coordinates: { lat: 49.82005, lng: 18.17933 },
		heroImage: {
			src: "/photos/ostrava-hall.jpg",
			alt: "Boulderová hala Hangaru Ostrava",
		},
		galleryImages: [
			{
				src: "/photos/ostrava-training.jpg",
				alt: "Tréninková zóna se strmou stěnou",
			},
			{ src: "/photos/ostrava-kilterboard.jpg", alt: "Kilterboard" },
			{ src: "/photos/ostrava-coaching.jpg", alt: "Trenér jistí malého lezce" },
			{
				src: "/photos/ostrava-routesetting.jpg",
				alt: "Stavění nových boulderů",
			},
			{ src: "/photos/ostrava-kids-park.jpg", alt: "Pohybový park pro děti" },
			{ src: "/photos/ostrava-shop.jpg", alt: "Outdoor shop" },
		],
		shortDescription:
			"Největší boulderovka v Moravskoslezském kraji: 1 500 m² lezecké plochy, Kilterboard a dvoupatrový dětský park.",
		address: "Nad Porubkou 2405, 708 00 Ostrava-Poruba",
		openingHours: [
			{ label: "Pondělí", days: [1], opens: "9:00", closes: "22:00" },
			{ label: "Úterý", days: [2], opens: "7:00", closes: "22:00" },
			{ label: "Středa", days: [3], opens: "9:00", closes: "22:00" },
			{ label: "Čtvrtek", days: [4], opens: "7:00", closes: "22:00" },
			{
				label: "Pátek–neděle",
				days: [5, 6, 7],
				opens: "9:00",
				closes: "22:00",
			},
		],
		email: "info@hangarostrava.cz",
		phone: "+420 606 766 983",
		prices: ostravaPrices,
		displayOrder: 2,
	},
	{
		name: "Hangar Praha",
		slug: "praha",
		city: "Praha",
		status: "coming-soon",
		coordinates: { lat: 50.08755, lng: 14.42121 },
		displayOrder: 3,
	},
	{
		name: "Hangar Plzeň",
		slug: "plzen",
		city: "Plzeň",
		status: "coming-soon",
		coordinates: { lat: 49.74775, lng: 13.37759 },
		displayOrder: 4,
	},
	{
		name: "Hangar Olomouc",
		slug: "olomouc",
		city: "Olomouc",
		status: "coming-soon",
		coordinates: { lat: 49.59378, lng: 17.25088 },
		displayOrder: 5,
	},
]

export const openGyms = gyms.filter(
	(gym): gym is OpenGym => gym.status === "open"
)

export function getOpenGym(slug: GymSlug) {
	const gym = openGyms.find(item => item.slug === slug)
	if (!gym) {
		throw new Error(`No open gym with slug "${slug}"`)
	}
	return gym
}
