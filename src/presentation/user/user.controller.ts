import { RolesEnum } from '@/application/use-cases/auth/guard/enums/roles.enum'
import { JwtAuthGuard } from '@/application/use-cases/auth/guard/passport/jwt.guard'
import { UpdatePasswordService } from '@/application/use-cases/user/services/update-password.service'
import { UpdatePermissionUserService } from '@/application/use-cases/user/services/update-permission-user.service'
import { UpdateUserService } from '@/application/use-cases/user/services/update-user.service'
import { MessageType } from '@/shared/common/@types/message.type'
import { ReqType } from '@/shared/common/@types/request.type'
import { Roles } from '@/shared/common/decorator/roles.decorator'
import { Body, Controller, Param, Patch, Req, UseGuards } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import {
	UpdatePasswordUserDTO,
	UpdatePermissionsUserDTO,
	UpdateUserDTO,
} from './dto/user.dto'

@Controller('v1/users')
@ApiTags('Usuários')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
	constructor(
		private readonly updatePermissionUserService: UpdatePermissionUserService,
		private readonly updateUserService: UpdateUserService,
		private readonly updatePasswordService: UpdatePasswordService,
	) {}

	@Patch('change-user')
	@Roles(RolesEnum.USER, RolesEnum.ADMIN)
	@ApiOperation({ summary: 'Altera dados de um usuário' })
	@ApiResponse({
		status: 200,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	async alterarUser(
		@Body() user: UpdateUserDTO,
		@Req() req: ReqType,
	): Promise<MessageType> {
		const idUser: number = req.user.sub
		return await this.updateUserService.execute(idUser, user)
	}

	@Patch(':id/permissions')
	@Roles(RolesEnum.ADMIN)
	@ApiOperation({ summary: 'Altera permissões de um usuário' })
	@ApiResponse({
		status: 200,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	async alterarPermissoes(
		@Param('id') idUser: number,
		@Body() permissionUser: UpdatePermissionsUserDTO,
	): Promise<MessageType> {
		return await this.updatePermissionUserService.execute(
			idUser,
			permissionUser,
		)
	}

	@Patch('change-password')
	@Roles(RolesEnum.USER, RolesEnum.ADMIN)
	@ApiOperation({ summary: 'Altera senha de um usuário' })
	@ApiResponse({
		status: 200,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	async alterarSenha(
		@Body() passwords: UpdatePasswordUserDTO,
		@Req() req: ReqType,
	): Promise<MessageType> {
		const idUser: number = req.user.sub
		return await this.updatePasswordService.execute(
			idUser,
			passwords.currentPassword,
			passwords.newPassword,
		)
	}
}
