import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateChatCreationDto } from './dto/create-chat_creation.dto';

@Injectable()
export class ChatCreationService {
  private readonly chatLogsDir = path.join(__dirname, '..', 'chat_logs');

  constructor() {
    if (!fs.existsSync(this.chatLogsDir)) {
      fs.mkdirSync(this.chatLogsDir);
    }
  }

  async createChat(createChatDto: CreateChatCreationDto): Promise<{ result: string }> {
    const { data_one, data_two } = createChatDto;

    const username1 = data_one.split('@')[0];
    const username2 = data_two.split('@')[0];

    const sortedNames = [username1, username2].sort();
    const chatFileName = `${sortedNames[0]}_${sortedNames[1]}_chat.json`;
    const chatFilePath = path.join(this.chatLogsDir, chatFileName);

    if (fs.existsSync(chatFilePath)) {
      return { result: "Chat already exists." };
    }

    const initialChatLog = {
      participants: sortedNames,
      messages: [],
      createdAt: new Date().toISOString(),
    };

    fs.writeFileSync(chatFilePath, JSON.stringify(initialChatLog, null, 2));
    return { result: "Chat created successfully." };
  }
} // ✅ Make sure this is the final closing brace — not missing or duplicated!

