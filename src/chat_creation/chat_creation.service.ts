import { Injectable } from '@nestjs/common';
import { CreateChatCreationDto } from './dto/create-chat_creation.dto';
import { UpdateChatCreationDto } from './dto/update-chat_creation.dto';

@Injectable()
export class ChatCreationService {
  create(createChatCreationDto: CreateChatCreationDto) {
    return 'This action adds a new chatCreation';
  }

  findAll() {
    return `This action returns all chatCreation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatCreation`;
  }

  update(id: number, updateChatCreationDto: UpdateChatCreationDto) {
    return `This action updates a #${id} chatCreation`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatCreation`;
  }
}
