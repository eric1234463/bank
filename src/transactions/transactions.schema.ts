import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop({ required: true })
  amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
