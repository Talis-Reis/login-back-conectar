import { CreateTokenService } from '@/application/use-cases/auth/services/create-token.service'
import { CreateUserService } from '@/application/use-cases/user/services/create-user.service'
import { MessageType } from '@/shared/common/@types/message.type'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { InputUserDTO } from '../user/dto/user.dto'
import { LoginDTO, ResponseAuthDTO } from './dto/auth.dto'

@Controller('v1/auth')
@ApiTags('Autenticação')
export class AuthController {
	constructor(
		private readonly createToken: CreateTokenService,
		private readonly createUserService: CreateUserService,
	) {}

	@Post('signin')
	@ApiOperation({ summary: 'Efetua login' })
	@ApiResponse({
		status: 200,
		description: 'Success',
		type: ResponseAuthDTO,
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	async signin(@Body() login: LoginDTO): Promise<{ accessToken: string }> {
		return await this.createToken.execute(login)
	}

	@Post('signup')
	@ApiOperation({ summary: 'Adiciona novos usuários' })
	@ApiResponse({
		status: 202,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	async signup(@Body() inputUser: InputUserDTO): Promise<MessageType> {
		return await this.createUserService.execute(inputUser)
	}
}
