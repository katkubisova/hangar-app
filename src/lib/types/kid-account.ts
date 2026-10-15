// Kid accounts depend on Hasam support. Kept as their own type (and their
// own screens later) so they're easy to remove.
export interface KidAccount {
	id: string
	firstName: string
	lastName: string
	birthYear: number
}
