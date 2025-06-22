export abstract class IAuth {
	abstract createToken(payload: any): Promise<string>
	abstract verifyToken(token: string): Promise<any>
}
