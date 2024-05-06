import {DataSource} from 'typeorm';
import {Users} from '../users/entities/users.entity';
import {Empresa} from '../../empresas/entities/empresa.entity';

import {ConfigService} from '@nestjs/config';
import {config} from 'dotenv';

config();

const configService = new ConfigService();
export const dataSource = new DataSource({
	type: configService.get<'mysql'>('DB_TYPE'),
	host: configService.get<string>('DB_HOST'),
	port: configService.get<number>('DB_PORT'),
	username: configService.get<string>('DB_USERNAME'),
	password: configService.get<string>('DB_PASSWORD'),
	database: configService.get<string>('DB_DATABASE'),

	/*type:'mysql',
  host:"192.168.0.3",
  port:3306,
  username:"carlangas",
  password:"18966566",
  database:"administracion",
  */ entities: [Users, Empresa], // Correct path
	synchronize: false,
});

export const DatabaseProviders = [
	{
		provide: 'DATA_SOURCE',
		useFactory: async () => {
			return dataSource.initialize();
		},
	},
];