import {Module} from '@nestjs/common';
import {EmpresasService} from './empresas.service';
import {EmpresasController} from './empresas.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmpresasRepository} from './empresas.repository';
import {Empresa} from './entities/empresa.entity';
import {AuthModule} from '../auth/auth.module';

@Module({
	imports: [AuthModule, TypeOrmModule.forFeature([Empresa])],
	controllers: [EmpresasController],
	providers: [EmpresasRepository, EmpresasService],
})
export class EmpresasModule {
}