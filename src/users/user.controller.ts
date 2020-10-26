import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor() {}

  @Get('me')
  getCurrentUser(): string {
      return 'hello'
  }
}
