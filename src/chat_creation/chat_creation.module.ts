import { Module } from '@nestjs/common';
import { ChatCreationService } from './chat_creation.service';
import { ChatCreationController } from './chat_creation.controller';

@Module({
  controllers: [ChatCreationController],
  providers: [ChatCreationService],
})
export class ChatCreationModule {}
