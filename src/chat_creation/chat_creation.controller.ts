import {
  Controller,
  Post,
  Body,
  Get,
  Param
} from '@nestjs/common';
import { ChatCreationService } from './chat_creation.service';
import { CreateChatCreationDto } from './dto/create-chat_creation.dto';
import * as fs from 'fs';
import * as path from 'path';

@Controller('messages')
export class ChatCreationController {
  constructor(private readonly chatCreationService: ChatCreationService) {}

  @Post()
  async create(@Body() messageData: CreateChatCreationDto) {
    return await this.chatCreationService.createChat(messageData);
  }

  @Get('user-chats/:user')
  getUserChats(@Param('user') user: string): string[] {
    const chat_logs = path.join(__dirname, '..', 'chat_logs'); // adjust this to match your structure

    const chatFiles = fs.readdirSync(chat_logs); // read files like "one_two_chat.json"
    const userChats = chatFiles
      .filter(
        (name) =>
          name.includes(user) && name.endsWith('_chat.json')
      )
      .map((name) => name.replace('.json', ''));

    return userChats;
  }
}
