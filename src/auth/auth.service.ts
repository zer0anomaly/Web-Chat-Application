// src/auth/auth.service.ts ✅ Clean Version
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

export interface User {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private jwtService: JwtService) {}

  register(createUserDto: CreateUserDto): string {
    const { email, password } = createUserDto;
    const userExists = this.users.find(user => user.email === email);

    if (userExists) {
      throw new Error('User already exists');
    }

    this.users.push({ email, password });

    const payload = { email };
    return this.jwtService.sign(payload); // ✅ return JWT
  }

  login(dto: LoginDto): string {
    const user = this.users.find(
      u => u.email === dto.email && u.password === dto.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const payload = { email: user.email };
    return this.jwtService.sign(payload); // ✅ return JWT
  }

  getAllUsers() {
    return this.users;
  }
}
