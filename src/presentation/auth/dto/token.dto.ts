import { UUID } from 'crypto'

export interface ITokenClaims {
	jti: UUID
	sub: number
	email: string
	authorization: string[]
}