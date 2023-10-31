import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/usuario')
@ApiTags('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({summary: 'Adicionar novo usuario'})
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.createUser(createUsuarioDto);
  }

  @Get()
  @ApiOperation({summary: 'Listar todos os usuarios'})
  findAll() {
    return this.usuarioService.findAllUser();
  }

  @Get(':id')
  @ApiOperation({summary: 'Listar um usuario por id'})
  findOne(@Param('id') id: string) {
    return this.usuarioService.viewUser(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Atualizar usuario'})
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.updateUser(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deletar usuario'})
  remove(@Param('id') id: string) {
    return this.usuarioService.removeUser(+id);
  }
}
