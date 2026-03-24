import { Test, TestingModule } from '@nestjs/testing';
import { EntrevistasController } from './entrevistas.controller';

describe('EntrevistasController', () => {
  let controller: EntrevistasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntrevistasController],
    }).compile();

    controller = module.get<EntrevistasController>(EntrevistasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
