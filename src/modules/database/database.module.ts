/*import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';

@Module({
  providers: [DatabaseProviders]
})
export class DatabaseModule {}*/

import {Module} from "@nestjs/common";
import {DatabaseProviders} from "./database.providers";

@Module({
	providers: [...DatabaseProviders],
	exports: [...DatabaseProviders]
})
export class DatabaseModule {
}