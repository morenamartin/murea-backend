import { Test, TestingModule } from '@nestjs/testing';
import { CartasController } from './cartas.controller';

describe('CartasController', () => {
  let controller: CartasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartasController],
    }).compile();

    controller = module.get<CartasController>(CartasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
