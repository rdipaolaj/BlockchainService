// src/application/commands/handlers/register-transaction.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterTransactionCommand } from '../register-transaction.command';
import { ITransactionService } from '@app/tangle/interfaces/transaction-service.interface';
import { TRANSACTION_SERVICE } from '@app/tangle/constants/tangle-service-token';

@CommandHandler(RegisterTransactionCommand)
export class RegisterTransactionHandler implements ICommandHandler<RegisterTransactionCommand> {
    constructor(
        @Inject(TRANSACTION_SERVICE) // Usa el token para inyectar el servicio correcto
        private readonly transactionService: ITransactionService
    ) {}

    async execute(command: RegisterTransactionCommand): Promise<any> {
        const { transactionData, tag } = command;
        return await this.transactionService.registerTransaction(transactionData, tag);
    }
}