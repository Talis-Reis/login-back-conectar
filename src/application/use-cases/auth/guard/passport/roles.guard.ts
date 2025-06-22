import { ROLES_KEY } from '@/shared/common/decorator/roles.decorator'
import {
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException, // Importe UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'; // Importe Observable

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super()
	}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		])

		if (!roles || roles.length === 0) {
			return true
		}

		return super.canActivate(context)
	}

	handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
		if (err || !user) {
			throw err || new UnauthorizedException('Usuário não autenticado.')
		}

		const roles: string[] = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		)

		if (!roles || roles.length === 0) {
			return user
		}
		if (!user.authorization) {
			throw new ForbiddenException('Usuário sem autorização definida.')
		}

		const hasRole = roles.some(role => user.authorization.includes(role))

		if (!hasRole) {
			throw new ForbiddenException(
				'Acesso negado, você não tem permissão para acessar este recurso.',
			)
		}

		return user
	}
}
