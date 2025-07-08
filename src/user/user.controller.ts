import { Controller, Delete, Req, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users') // route will be /users/delete
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('delete')
  deleteAccount(@Body() body: { email: string }) {
    return this.userService.deleteAccount(body.email);
  }
}
