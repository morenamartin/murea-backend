import { Test, TestingModule } from '@nestjs/testing';
import { EntrevistasService } from './entrevistas.service';

describe('EntrevistasService', () => {
  let service: EntrevistasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntrevistasService],
    }).compile();

    service = module.get<EntrevistasService>(EntrevistasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
