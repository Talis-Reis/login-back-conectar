import { PaginationCommonDTO } from '@/shared/common/presentation/dto/pagination.dto'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
	ArrayNotEmpty,
	ArrayUnique,
	IsArray,
	IsEmail,
	IsIn,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
	MinLength,
} from 'class-validator'
import { IsOnlyAdminOrUser } from '../validators/permissions.validator'

export class InputUserDTO {
	@ApiProperty()
	@IsEmail({}, { message: 'O campo email deve ser um email válido' })
	@IsString({ message: 'O campo email deve ser uma string' })
	@IsNotEmpty({ message: 'O campo email não pode ser vazio' })
	email: string

	@ApiProperty()
	@IsString({ message: 'O campo password deve ser uma string' })
	@IsNotEmpty({ message: 'O campo password não pode ser vazio' })
	@MinLength(8)
	@Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
		message:
			'A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial',
	})
	password: string

	@ApiProperty()
	@IsString({ message: 'O campo firstName deve ser uma string' })
	@IsNotEmpty({ message: 'O campo firstName não pode ser vazio' })
	firstName: string

	@ApiProperty()
	@IsString({ message: 'O campo lastName deve ser uma string' })
	@IsNotEmpty({ message: 'O campo lastName não pode ser vazio' })
	lastName: string

	@ApiProperty({ type: [String] })
	@IsArray({ message: 'O campo roles deve ser um array' })
	@ArrayNotEmpty({ message: 'O campo roles não pode ser vazio' })
	@ArrayUnique({
		message: 'O campo roles não pode conter valores duplicados',
	})
	@IsString({ each: true, message: 'Cada role deve ser uma string' })
	@IsIn(['admin', 'user'], {
		each: true,
		message: "Cada role deve ser uma das seguintes: 'admin' ou 'user'",
	})
	@IsOnlyAdminOrUser({
		message:
			"O usuário não pode ter as roles 'admin' e 'user' ao mesmo tempo",
	})
	roles: string[]
}

export class UpdateUserDTO {
	@ApiProperty()
	@IsOptional()
	@IsEmail({}, { message: 'O campo email deve ser um email válido' })
	@IsString({ message: 'O campo email deve ser uma string' })
	email: string

	@ApiProperty()
	@IsOptional()
	@IsString({ message: 'O campo firstName deve ser uma string' })
	firstName: string

	@ApiProperty()
	@IsOptional()
	@IsString({ message: 'O campo lastName deve ser uma string' })
	lastName: string
}

export class UpdatePermissionsUserDTO {
	@ApiProperty({ type: [String] })
	@IsArray({ message: 'O campo roles deve ser um array' })
	@ArrayNotEmpty({ message: 'O campo roles não pode ser vazio' })
	@ArrayUnique({
		message: 'O campo roles não pode conter valores duplicados',
	})
	@IsString({ each: true, message: 'Cada role deve ser uma string' })
	@IsIn(['admin', 'user'], {
		each: true,
		message: "Cada role deve ser uma das seguintes: 'admin' ou 'user'",
	})
	@IsOnlyAdminOrUser({
		message:
			"O usuário não pode ter as roles 'admin' e 'user' ao mesmo tempo",
	})
	roles: string[]
}

export class UpdatePasswordUserDTO {
	@ApiProperty()
	@IsString({ message: 'O campo currentPassword deve ser uma string' })
	@IsNotEmpty({ message: 'O campo currentPassword não pode ser vazio' })
	currentPassword: string

	@ApiProperty()
	@IsString({ message: 'O campo newPassword deve ser uma string' })
	@IsNotEmpty({ message: 'O campo newPassword não pode ser vazio' })
	@MinLength(8)
	@Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
		message:
			'A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial',
	})
	newPassword: string
}

export class UpdateAccessUserDTO {
	firstAccess: Date
	lastAccess: Date
}

export class ResponseUserDTO {
	@ApiProperty()
	@Expose()
	id: number

	@ApiProperty()
	@Expose()
	email: string

	@ApiProperty()
	@Expose()
	firstName: string

	@ApiProperty()
	@Expose()
	lastName: string

	@ApiProperty()
	@Expose()
	roles: string[]

	@ApiProperty()
	@Expose()
	firstAccess: Date | null

	@ApiProperty()
	@Expose()
	lastAccess: Date | null

	@ApiProperty()
	@Expose()
	createdAt: Date
}

export class FilterUserDTO extends PaginationCommonDTO {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString({ message: 'O campo firstName deve ser uma string' })
	firstName?: string

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString({ message: 'O campo roles deve ser uma string' })
	@IsIn(['admin', 'user'], {
		message: "O campo roles deve ser 'admin' ou 'user'",
	})
	roles?: string

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString({ message: 'O campo sortBy deve ser uma string' })
	@IsIn(['firstName', 'createdAt'], {
		message:
			"O campo sortBy deve ser um dos seguintes: 'firstName' ou 'createdAt'",
	})
	sortBy?: string

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString({ message: 'O campo order deve ser uma string' })
	@IsIn(['asc', 'desc'], {
		message: "O campo order deve ser 'asc' ou 'desc'",
	})
	order?: string
}
