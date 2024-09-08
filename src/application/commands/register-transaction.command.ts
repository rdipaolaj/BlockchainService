// src/application/commands/register-transaction.command.ts
import { RegisterTransactionDto } from './dtos/register-transaction.dto';

export class RegisterTransactionCommand {
    constructor(public readonly transactionData: RegisterTransactionDto) { }
}