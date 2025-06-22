export type ReqType = {
	headers: {
		authorization: string
	}
	user: {
		sub: number
		email: string
		authorization: string[]
	}
}
