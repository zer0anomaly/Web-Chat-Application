import { Controller, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users') // This makes the route /users/delete
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('delete')
  deleteAccount(@Query('email') email: string) {
    return this.userService.deleteAccount(email);
  }
}
