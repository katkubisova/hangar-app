export interface Purchase {
	id: string
	productId: string
	date: string
	// CZK, the price paid.
	amount: number
	paymentCardId: string
}
