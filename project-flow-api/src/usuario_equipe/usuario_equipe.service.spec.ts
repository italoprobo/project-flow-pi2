import { Test, TestingModule } from '@nestjs/testing';
import { Usuario_equipeService } from './usuario_equipe.service';

describe('Usuario_equipeService', () => {
  let service: Usuario_equipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Usuario_equipeService],
    }).compile();

    service = module.get<Usuario_equipeService>(Usuario_equipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
