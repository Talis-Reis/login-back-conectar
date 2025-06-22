import { IUserRepository } from '@/application/interfaces/user.inteface'
import { CreateUserService } from '@/application/use-cases/user/services/create-user.service'
import { DeleteUserService } from '@/application/use-cases/user/services/delete-user.service'
import { GetAllService } from '@/application/use-cases/user/services/get-all.service'
import GetByIdService from '@/application/use-cases/user/services/get-by-id.service'
import { GetUserByEmailService } from '@/application/use-cases/user/services/get-user-by-email.service'
import { UpdateAccessUserService } from '@/application/use-cases/user/services/update-access-user.service'
import { UpdatePasswordService } from '@/application/use-cases/user/services/update-password.service'
import { UpdatePermissionUserService } from '@/application/use-cases/user/services/update-permission-user.service'
import { UpdateUserService } from '@/application/use-cases/user/services/update-user.service'
import { UserRepository } from '@/infrastructure/repositories/user.repository'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'

const user = {
	provide: IUserRepository,
	useClass: UserRepository,
}

@Module({
	providers: [
		user,
		CreateUserService,
		GetUserByEmailService,
		UpdateAccessUserService,
		UpdatePermissionUserService,
		UpdateUserService,
		UpdatePasswordService,
		DeleteUserService,
		GetByIdService,
		GetAllService,
	],
	exports: [
		CreateUserService,
		GetUserByEmailService,
		UpdateAccessUserService,
	],
	controllers: [UserController],
})
export class UserModule {}
