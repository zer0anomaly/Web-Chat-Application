import { Test, TestingModule } from '@nestjs/testing';
import { ChatCreationController } from './chat_creation.controller';
import { ChatCreationService } from './chat_creation.service';

describe('ChatCreationController', () => {
  let controller: ChatCreationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatCreationController],
      providers: [ChatCreationService],
    }).compile();

    controller = module.get<ChatCreationController>(ChatCreationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
