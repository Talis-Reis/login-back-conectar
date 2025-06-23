import { UUID } from 'crypto'

export interface ITokenClaims {
	jti: UUID
	sub: number
	email: string
	firstName: string
	lastName: string
	authorization: string[]
}