import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './modules/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Users} from './modules/users/entities/users.entity';
import {EmpresasModule} from './empresas/empresas.module';
import {AuthModule} from './auth/auth.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {constValidationSchema} from './config.schema';

const confFile = `.env`;
console.error(confFile);

@Module({
	controllers: [AppController],
	imports: [
		ConfigModule.forRoot({
			envFilePath: [confFile],
			validationSchema: constValidationSchema,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const isProd = configService.get('STAGE') === 'prod';
				return {
					ssl: isProd,
					extra: {
						ssl: isProd ? {rejectUnauthorized: false} : null,
					},
					type: configService.get<'mysql'>('DB_TYPE'),
					host: configService.get<string>('DB_HOST'),
					port: configService.get<number>('DB_PORT'),
					username: configService.get<string>('DB_USERNAME'),
					password: configService.get<string>('DB_PASSWORD'),
					database: configService.get<string>('DB_DATABASE'),
					autoLoadEntities: true,
					synchronize: false,
					entities: [Users], // Correct path
				};
			},
			/*
        type:'mysql',
        host:"192.168.0.3",
        port:3306,
        username:"carlangas",
        password:"18966566",
        database:"administracion",
        autoLoadEntities:true,
        synchronize:false,
        entities: [
          Users
        ], // Correct path
        */
		}),
		UsersModule,
		// DatabaseModule,
		EmpresasModule,
		AuthModule,
	],
	providers: [AppService],
})
export class AppModule {
}