// A photo from public/photos. Without a src (e.g. a branch that isn't open
// yet) the brand gradient stands in for it, labelled with the alt text.
export interface Photo {
	src?: string
	alt: string
}
