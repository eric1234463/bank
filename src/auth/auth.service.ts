import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.schema';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (user && compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
}
