import { Controller, Post, UseGuards, Body, HttpStatus, HttpException, Param } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { BankAccountService } from 'src/bank-account/bank-account.service';
import { CreateTransactionForm } from './create-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('/bank-account/:id/transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly bankAccountService: BankAccountService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Post('new')
  async getCurrentAccount(@Param() params, @Body() payload: CreateTransactionForm) {
    
    const bankAccount = await this.bankAccountService.findOneById(params.id)

    if (!bankAccount) {
      throw new HttpException('bank account not found', HttpStatus.UNPROCESSABLE_ENTITY); 
    }

    return this.transactionsService.create({
      ...payload,
      bankAccountId: bankAccount._id,
    })

  }
}
