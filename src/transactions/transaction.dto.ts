import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionForm {
  @ApiProperty()
  bankAccountId: string;
  @ApiProperty()
  from: string | null;
  @ApiProperty()
  to: string | null;
  @ApiProperty()
  amount: number;
}


export class ViewTransactionForm {
  @ApiProperty()
  bankAccountId: string;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  offset: number;
}

export class UpdateTransactionForm {
  @ApiProperty()
  transactionsId: string;
  @ApiProperty()
  bankAccountId: string;
  @ApiProperty()
  amount: number;
}
