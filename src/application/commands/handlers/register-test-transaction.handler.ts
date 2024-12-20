import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterTransactionCommand } from '../register-transaction.command';
import { ITransactionService } from 'src/tangle/interfaces/transaction-service.interface';
import { TRANSACTION_SERVICE } from 'src/tangle/constants/tangle-service-token';

@CommandHandler(RegisterTransactionCommand)
export class RegisterTestTransactionHandler implements ICommandHandler<RegisterTransactionCommand> {
    constructor(
        @Inject(TRANSACTION_SERVICE) // Usa el token para inyectar el servicio correcto
        private readonly transactionService: ITransactionService
    ) { }

    async execute(command: RegisterTransactionCommand): Promise<any> {
        const { transactionData, tag } = command;
        return await this.transactionService.registerTestTransaction(transactionData, tag);
    }
}
