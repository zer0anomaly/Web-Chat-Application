import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatCreationService } from './chat_creation.service';
import { CreateChatCreationDto } from './dto/create-chat_creation.dto';
import { UpdateChatCreationDto } from './dto/update-chat_creation.dto';

@Controller('chat_creation')
  export class ChatCreation()