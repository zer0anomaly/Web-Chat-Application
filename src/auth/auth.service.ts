import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

export interface User {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  public users: User[] = [];

  constructor(private jwtService: JwtService) {}

  register(createUserDto: CreateUserDto): string {
    const { email, password } = createUserDto;
    const userExists = this.users.find(user => user.email === email);

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    this.users.push({ email, password });

    const payload = { email };
    return this.jwtService.sign(payload); 
  }

  login(dto: LoginDto): string {
    const user = this.users.find(
      u => u.email === dto.email && u.password === dto.password
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { email: user.email };
    return this.jwtService.sign(payload);
  }

  getAllUsers() {
    return this.users;
  }

  decodeToken(token: string): any {
    return this.jwtService.verify(token); 
  }
}
