import { PartialType } from '@nestjs/mapped-types';
import { CreateChatCreationDto } from './create-chat_creation.dto';

export class UpdateChatCreationDto extends PartialType(CreateChatCreationDto) {}
