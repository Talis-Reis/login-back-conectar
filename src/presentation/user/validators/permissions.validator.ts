import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator'

export function IsOnlyAdminOrUser(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isOnlyAdminOrUser',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: string[], _args: ValidationArguments) {
					if (!Array.isArray(value)) return false
					const hasAdmin = value.includes('admin')
					const hasUser = value.includes('user')
					return !(hasAdmin && hasUser)
				},
				defaultMessage(_args: ValidationArguments) {
					return "O usuário não pode ter as roles 'admin' e 'user' ao mesmo tempo"
				},
			},
		})
	}
}
