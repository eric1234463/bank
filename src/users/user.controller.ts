import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserForm } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('me')
  getCurrentUser(): string {
    return 'hello';
  }

  @Post('new')
  async create(@Body() createUser: CreateUserForm) {
    try {
      const { password, ...restUser } = await this.userService.create(
        createUser,
      );
      return restUser;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('signIn')
  async signIn(@Body() createUser: CreateUserForm) {
    const user = await this.authService.validateUser(
      createUser.email,
      createUser.password,
    );

    if (!user) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    const { password, ...restUser } = JSON.parse(JSON.stringify(user));

    return restUser
  }
}
