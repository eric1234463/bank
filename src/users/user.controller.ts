import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { BankAccountService } from 'src/bank-account/bank-account.service';
import { CreateUserForm } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly bankAccountService: BankAccountService,
  ) {}

  @Get('me')
  getCurrentUser(): string {
    return 'hello';
  }

  @Post('new')
  async create(@Body() createUser: CreateUserForm) {
    try {
      const user  = await this.userService.create(
        createUser,
      );

      await this.bankAccountService.create({ userId: user._id });

      const { password, ...restUser } = JSON.parse(JSON.stringify(user));

      return restUser;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
