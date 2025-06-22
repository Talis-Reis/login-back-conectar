import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import {
	FilterUserDTO,
	InputUserDTO,
	UpdateAccessUserDTO,
	UpdatePermissionsUserDTO,
	UpdateUserDTO,
} from '@/presentation/user/dto/user.dto'
import { Inject, Injectable } from '@nestjs/common'
import { ArrayContains, ILike, Repository } from 'typeorm'

@Injectable()
export class UserRepository implements IUserRepository {
	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<Users>,
	) {}

	async updateUser(id: number, user: UpdateUserDTO): Promise<void> {
		await this.userRepository.update(
			{
				id: id,
			},
			{
				...user,
				updatedAt: new Date(),
			},
		)
	}

	async getUserById(id: number): Promise<Users> {
		return this.userRepository.findOne({
			where: {
				id: id,
			},
		})
	}

	async updatePermissionUser(
		id: number,
		roles: UpdatePermissionsUserDTO,
	): Promise<void> {
		await this.userRepository.update(
			{
				id: id,
			},
			{
				...roles,
				updatedAt: new Date(),
			},
		)
	}

	async updatePasswordUser(id: number, newPassword: string): Promise<void> {
		await this.userRepository.update(
			{
				id: id,
			},
			{
				password: newPassword,
				updatedAt: new Date(),
			},
		)
	}

	async createUser(user: InputUserDTO): Promise<Users> {
		return await this.userRepository.save({
			...user,
			createdAt: new Date(),
		})
	}

	async getUserByEmail(email: string): Promise<Users> {
		return await this.userRepository.findOne({
			where: {
				email: email,
			},
		})
	}

	async updateAcessUser(
		id: number,
		accessUser: UpdateAccessUserDTO,
	): Promise<void> {
		await this.userRepository.update(
			{
				id: id,
			},
			{
				...accessUser,
			},
		)
	}

	async deleteUser(id: number): Promise<void> {
		await this.userRepository.delete({
			id: id,
		})
	}

	async getAllUsers(filter: FilterUserDTO): Promise<[Users[], number]> {
		return await this.userRepository.findAndCount({
			where: {
				...(filter.firstName
					? {
							firstName: ILike(`%${filter.firstName}%`),
						}
					: {}),
				...(filter.roles
					? {
							roles: ArrayContains([filter.roles]),
						}
					: {}),
			},
			take: filter.pageSize,
			skip: (filter.pageIndex - 1) * filter.pageSize,
			order: {
				[filter.sortBy ? filter.sortBy : 'id']:
					filter.order === 'asc' ? 'ASC' : 'DESC',
			},
		})
	}
}
