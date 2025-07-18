import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatCreationService } from './chat_creation.service';
import { CreateChatCreationDto } from './dto/create-chat_creation.dto';
import { UpdateChatCreationDto } from './dto/update-chat_creation.dto';

@Controller('chat-creation')
export class ChatCreationController {
  constructor(private readonly chatCreationService: ChatCreationService) {}

  @Post()
  create(@Body() createChatCreationDto: CreateChatCreationDto) {
    return this.chatCreationService.create(createChatCreationDto);
  }

  @Get()
  findAll() {
    return this.chatCreationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatCreationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatCreationDto: UpdateChatCreationDto) {
    return this.chatCreationService.update(+id, updateChatCreationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatCreationService.remove(+id);
  }
}
