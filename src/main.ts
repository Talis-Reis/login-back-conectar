import { ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import * as packageJson from '../package.json'
import { AppModule } from './app.module'
import { RolesGuard } from './application/use-cases/auth/guard/passport/roles.guard'
import { loadEnvironment } from './shared/common/infrastructure/config/env/env.loader'
import { IEnvConfig } from './shared/common/infrastructure/interface/env.interface'

loadEnvironment()
async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors()

	app.useGlobalGuards(new RolesGuard(new Reflector()))

	app.useGlobalPipes(
		new ValidationPipe({
			forbidUnknownValues: true,
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	)

	app.setGlobalPrefix(`api`)

	const config = new DocumentBuilder()
		.setTitle('user control')
		.setDescription(packageJson.description)
		.setContact(
			packageJson.author,
			'https://www.talis.dev',
			'talisapreis@gmail.com',
		)
		.setVersion(packageJson.version)
		.addBearerAuth()
		.build()

	const document: OpenAPIObject = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, document, {
		customSiteTitle: 'user control',
	})

	const port: number = app.get(IEnvConfig).getAppPort()

	await app.listen(port)
}
bootstrap()
