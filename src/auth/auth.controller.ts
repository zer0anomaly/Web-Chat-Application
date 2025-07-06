// src/auth/auth.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    const token = this.authService.register(createUserDto);
    return { token }; // ✅ properly labeled
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    const token = this.authService.login(dto);
    return { token }; // ✅ same fix here
  }

  @Get('users')
  getUsers() {
    return this.authService.getAllUsers();
  }
}
