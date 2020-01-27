import { Test, TestingModule } from '@nestjs/testing';
import { JaulaController } from '../jaula.controller';

describe('Jaula Controller', () => {
  let controller: JaulaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JaulaController],
    }).compile();

    controller = module.get<JaulaController>(JaulaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
