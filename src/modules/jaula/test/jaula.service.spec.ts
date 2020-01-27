import { Test, TestingModule } from '@nestjs/testing';
import { JaulaService } from '../jaula.service';

describe('JaulaService', () => {
  let service: JaulaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JaulaService],
    }).compile();

    service = module.get<JaulaService>(JaulaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
