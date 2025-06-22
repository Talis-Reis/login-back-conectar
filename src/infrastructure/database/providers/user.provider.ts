import { Users } from '@/domain/models/users.entity'
import { DataSource } from 'typeorm'

export const userProvider = [
	{
		provide: 'USER_REPOSITORY',
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
		inject: ['DATABASE_CONECTAR_CONNECTION'],
	},
]
