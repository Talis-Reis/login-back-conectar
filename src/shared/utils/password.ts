import * as bcrypt from 'bcrypt'
const saltRounds = 10

export const createPassword = (password: string): Promise<string> =>
	bcrypt.hash(password, saltRounds)

export const comparePassword = (
	password: string,
	hash: string,
): Promise<boolean> => bcrypt.compare(password, hash)
