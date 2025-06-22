import { Users } from '@/domain/models/users.entity'
import {
	InputUserDTO,
	UpdateAccessUserDTO,
	UpdatePermissionsUserDTO,
	UpdateUserDTO,
} from '@/presentation/user/dto/user.dto'

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
}
