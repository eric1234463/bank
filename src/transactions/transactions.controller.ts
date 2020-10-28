import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  HttpException,
  Param,
  Get,
  Request,
  Put,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { BankAccountDocument } from 'src/bank-account/bank-account.schema';
import { BankAccountService } from 'src/bank-account/bank-account.service';
import {
  CreateTransactionForm,
  UpdateTransactionForm,
  ViewTransactionForm,
} from './transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('/bank-account/:id/transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly bankAccountService: BankAccountService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Post('new')
  async getCurrentAccount(
    @Param() params,
    @Body() payload: CreateTransactionForm,
    @Request() req,
  ) {
    const bankAccount = await this.bankAccountService.findOneByIdAndUserId(
      params.id,
      req.user._id,
    );

    if (!bankAccount) {
      throw new HttpException(
        'bank account not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.transactionsService.create({
      ...payload,
      bankAccountId: bankAccount._id,
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/')
  async index(
    @Param() params,
    @Body() payload: ViewTransactionForm,
    @Request() req,
  ) {
    let bankAccount: BankAccountDocument | null = null;

    if (req.user.role === 'staff') {
      bankAccount = await this.bankAccountService.findOneById(params.id);
    } else {
      bankAccount = await this.bankAccountService.findOneByIdAndUserId(
        params.id,
        req.user._id,
      );
    }

    if (!bankAccount) {
      throw new HttpException(
        'bank account not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const transactions = await this.transactionsService.index({
      ...payload,
      bankAccountId: bankAccount._id,
    });

    return transactions.map(transaction =>
      this.transactionsService.hideSensitiveInfo(
        transaction,
        req.user.role === 'staff' && !bankAccount.userId.equals(req.user._id),
      ),
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Put('/:transactionsId')
  async update(
    @Param() params,
    @Body() payload: UpdateTransactionForm,
    @Request() req,
  ) {
    const bankAccount = await this.bankAccountService.findOneByIdAndUserId(
      params.id,
      req.user._id,
    );

    if (!bankAccount) {
      throw new HttpException(
        'bank account not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.transactionsService.update({
      ...payload,
      transactionsId: params.transactionsId,
      bankAccountId: bankAccount._id,
    });
  }
}
