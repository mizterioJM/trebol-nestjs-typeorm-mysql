import { Test, TestingModule } from '@nestjs/testing';
import { ServicioController } from '../servicio.controller';

describe('Servicio Controller', () => {
  let controller: ServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicioController],
    }).compile();

    controller = module.get<ServicioController>(ServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
