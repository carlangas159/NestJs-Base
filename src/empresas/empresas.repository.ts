import {EntityRepository, Repository} from 'typeorm';
import {NotFoundException} from '@nestjs/common';
import {Empresa} from './entities/empresa.entity';
import {CreateEmpresaDto} from './dto/create-empresa.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Users} from '../modules/users/entities/users.entity';

@EntityRepository(Empresa)
export class EmpresasRepository extends Repository<Empresa> {
	constructor(
		@InjectRepository(Empresa)
		private empresaRepository: Repository<Empresa>,
	) {
		super(empresaRepository.target, empresaRepository.manager, empresaRepository.queryRunner);
	}

	async createEmpresa(empresasDto: CreateEmpresaDto, user: Users): Promise<Empresa> {
		empresasDto.created_by = user.id;
		empresasDto.updated_by = user.id;
		empresasDto.created_at = new Date();
		empresasDto.updated_at = new Date();
		empresasDto.user = user;
		const empresa = this.create(empresasDto);
		await this.save(empresa);

		return empresa;
	}

	async byId(id: number): Promise<Empresa> {
		const found = this.findOneBy({id: id});
		if (!found) {
			throw new NotFoundException(`La empresa con id ${id} no se encuentra`);
		}
		return found;
	}

	async deleteById(id: number): Promise<void> {
		const deleted = await this.delete({id: id});
		if (deleted.affected < 1) {
			throw new NotFoundException(`La empresa con id ${id} no pudo borrarse`);
		}
		return;
	}
}