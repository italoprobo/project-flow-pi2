import { Controller, Get} from '@nestjs/common';
import { Usuario_equipeService } from './usuario_equipe.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/usuario_equipe')
@ApiTags('usuario_equipe')
export class Usuario_equipeController {
  constructor(private readonly usuario_equipeService: Usuario_equipeService) {}

  @Get()
  @ApiOperation({summary: 'Listar todos os usuarios_equipe'})
  findAll() {
    return this.usuario_equipeService.findAllUser_Team();
  }
}
