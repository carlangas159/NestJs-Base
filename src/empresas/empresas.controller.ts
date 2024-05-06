import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {EmpresasService} from './empresas.service';
import {CreateEmpresaDto} from './dto/create-empresa.dto';
import {UpdateEmpresaDto} from './dto/update-empresa.dto';
import {AuthGuard} from '@nestjs/passport';
import {GetUserDecorator} from '../auth/decorators/get-user.decorator';
import {Users} from '../modules/users/entities/users.entity';

@Controller('admin/empresas')
@UseGuards(AuthGuard())
export class EmpresasController {
	constructor(private readonly empresasService: EmpresasService) {
	}

	@Post()
	create(@Body() createEmpresaDto: CreateEmpresaDto, @GetUserDecorator() user: Users) {
		return this.empresasService.create(createEmpresaDto, user);
	}

	@Get()
	findAll() {
		return this.empresasService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.empresasService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
		return this.empresasService.update(+id, updateEmpresaDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.empresasService.remove(+id);
	}
}