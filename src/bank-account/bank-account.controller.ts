import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { BankAccountService } from './bank-account.service';

@Controller('bank-account')
export class BankAccountController {
  constructor(
    private readonly bankAccountService: BankAccountService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  async getCurrentAccount(@Request() req) {
    const bankAccount = await this.bankAccountService.findOneByUserId(req.user._id)

    return bankAccount
  }
}
