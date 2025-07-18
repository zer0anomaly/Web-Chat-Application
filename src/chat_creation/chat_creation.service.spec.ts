import { Test, TestingModule } from '@nestjs/testing';
import { ChatCreationService } from './chat_creation.service';

describe('ChatCreationService', () => {
  let service: ChatCreationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatCreationService],
    }).compile();

    service = module.get<ChatCreationService>(ChatCreationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
