import { Injectable } '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateChatCreationDto } from './dto/create-chat_creation.dto';

@Injectable
export class ChatService {
  private readonly chatLogsDir = path.join(__dirname, '..', 'chat_logs');

  constructor() {
    if (!fs.existsSync(this.chatLogsDir)){
      fs.mkdirSync(this.chatLogsDir);
    }
  }
  async createChat(createChatDto: CreateChatCreationDto): Promise<string> {
    const {user1, user2 } = createChatDto;

    const username1 = user1.split('@')[0];
    const username2 = user2.split('@')[0];

    const sortedNames = [username1, username2].sort();
    const chatFileName = `${sortedNames[0]}_${sortedNames[1]}_chat.json`;
    const chatFilePath = path.join(this.chatLogsDir, chatFileName);

    if(fs.existsSync(chatFilePath)){
      return `Chat already exists.`
    }

    const initialChatLog = {
      participants: sortedNames,
      messages: [],
      createdAt: new Date().toISOString(),
    };

    fs.writeFileSync(chatFilePath, JSON.stringify(initialChatLog, null, 2))
    return `Chat created successfully.`

  }
}
