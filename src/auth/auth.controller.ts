import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): string {
    return this.authService.register(createUserDto);
  }

  @Get('users')
  getUsers() {
    return this.authService.getAllUsers();
  }
}
