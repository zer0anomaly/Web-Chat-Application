import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

export interface User {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  register(dto: CreateUserDto): string {
    const exists = this.users.find(user => user.email === dto.email);
    if (exists) return 'Email already exists';

    this.users.push({ email: dto.email, password: dto.password });
    return 'Registration Successful';
  }

  login(dto: LoginDto): string {
    const user = this.users.find(user => user.email === dto.email);
    if (!user) return 'User not found';
    if (user.password !== dto.password) return 'Invalid password';

    return 'Login successful';
  }

  getAllUsers(): User[] {
    return this.users;
  }
}
