import { Users } from '@/domain/models/users.entity'
import {
	InputUserDTO,
	UpdateAccessUserDTO,
	UpdatePermissionsUserDTO,
	UpdateUserDTO,
} from '@/presentation/user/dto/user.dto'
import { PaginationCommonDTO } from '@/shared/common/presentation/dto/pagination.dto'

export abstract class IUserRepository {
	abstract createUser(user: InputUserDTO): Promise<Users>
	abstract getUserByEmail(email: string): Promise<Users>
	abstract getUserById(id: number): Promise<Users>
	abstract updateAcessUser(
		id: number,
		user: UpdateAccessUserDTO,
	): Promise<void>
	abstract updatePermissionUser(
		id: number,
		roles: UpdatePermissionsUserDTO,
	): Promise<void>
	abstract updateUser(id: number, user: UpdateUserDTO): Promise<void>
	abstract updatePasswordUser(id: number, newPassword: string): Promise<void>
	abstract deleteUser(id: number): Promise<void>
	abstract getAllUsers(
		pagination: PaginationCommonDTO,
	): Promise<[Users[], number]>
	abstract getAllUsersInactives(
		pagination: PaginationCommonDTO,
	): Promise<[Users[], number]>
}
