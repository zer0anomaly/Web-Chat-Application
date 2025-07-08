import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service'; // ✅ import AuthService

@Injectable()
export class UserService {
  constructor(private readonly authService: AuthService) {} // ✅ inject it

  deleteAccount(email: string) {
    const index = this.authService.users.findIndex(user => user.email === email);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.authService.users.splice(index, 1);
    return { message: 'Account deleted successfully' };
  }
}
