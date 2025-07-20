import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ChatService } from './chat_creation.service'
import { Chat_creation_Dto } from './dto/create-chat_creation'

@Controller('chat_creation')
export class chat_creation_controller {
  constructor(private readonly ChatService: ChatService) {}
  
  @Post()
  chat_creation(@Body() chat_creation_Dto: Chat_creation_Dto){}
  return this.
}