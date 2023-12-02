import { Test, TestingModule } from '@nestjs/testing';
import { Usuario_equipeController } from './usuario_equipe.controller';
import { Usuario_equipeService } from './usuario_equipe.service';

describe('Usuario_equipeController', () => {
  let controller: Usuario_equipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Usuario_equipeController],
      providers: [Usuario_equipeService],
    }).compile();

    controller = module.get<Usuario_equipeController>(Usuario_equipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
