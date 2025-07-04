import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

export interface User {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  register(createUserDto: CreateUserDto): string {
    const { email, password } = createUserDto;

    const userExists = this.users.find(user => user.email === email);
    if (userExists) return 'User already exists';

    this.users.push({ email, password });
    return 'User registered successfully';
  }

  getAllUsers(): User[] {
    return this.users;
  }
}
