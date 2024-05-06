import {Injectable} from '@nestjs/common';
import {CreateEmpresaDto} from './dto/create-empresa.dto';
import {UpdateEmpresaDto} from './dto/update-empresa.dto';
import {EmpresasRepository} from './empresas.repository';
import {Users} from '../modules/users/entities/users.entity';

@Injectable()
export class EmpresasService {
	constructor(private readonly empresasRepository: EmpresasRepository) {
	}

	create(createEmpresaDto: CreateEmpresaDto, user: Users) {
		return this.empresasRepository.createEmpresa(createEmpresaDto, user);
	}

	findAll() {
		return this.empresasRepository.find();
	}

	findOne(id: number) {
		return this.empresasRepository.findOneBy({id: id});
	}

	update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
		return this.empresasRepository.deleteById(id);
	}

	remove(id: number) {
		return this.empresasRepository.deleteById(id);
	}
}