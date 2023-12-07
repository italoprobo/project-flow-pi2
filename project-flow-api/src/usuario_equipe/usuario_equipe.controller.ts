import { Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { Usuario_equipeService } from './usuario_equipe.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioEquipeDto } from './dto/create-usuario_equipe.dto';

@Controller('api/v1/usuario_equipe')
@ApiTags('usuario_equipe')
export class Usuario_equipeController {
  constructor(private readonly usuario_equipeService: Usuario_equipeService) {}

  @Get()
  @ApiOperation({summary: 'Listar todos os usuarios_equipe'})
  findAll() {
    return this.usuario_equipeService.findAllUser_Team();
  }

  @Post()
  @ApiOperation({summary: 'Adicionar um usuario_equipe'})
  create(@Body() creatUsuario_EquipeDto: CreateUsuarioEquipeDto) {
    return this.usuario_equipeService.addMember(creatUsuario_EquipeDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deletar usuario'})
  remove(@Param('id') id: number) {
    return this.usuario_equipeService.removeMember(+id);
  }
}
