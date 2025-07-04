import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 @Post('register')
  register(@Body() createUserDto: CreateUserDto): { message: string } {
  const result = this.authService.register(createUserDto);
  return { message: result };
}
 @Post('login')
  login(@Body() dto: LoginDto){
    const result = this.authService.login(dto);
    return {message: result}
  }

  @Get('users')
  getUsers() {
    return this.authService.getAllUsers();
  }
}
