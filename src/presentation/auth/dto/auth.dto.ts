import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDTO {
	@ApiProperty()
	@IsString({ message: 'O campo email deve ser uma string' })
	@IsNotEmpty({ message: 'O campo email não pode ser vazio' })
	email: string

	@ApiProperty()
	@IsString({ message: 'O campo password deve ser uma string' })
	@IsNotEmpty({ message: 'O campo password não pode ser vazio' })
	password: string
}

export class ResponseAuthDTO {
	@ApiProperty()
	accessToken: string
}
