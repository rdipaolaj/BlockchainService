// src/application/commands/handlers/register-transaction.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TangleService } from 'src/tangle/tangle.service';
import { RegisterTransactionCommand } from '../register-transaction.command';
import { IBuildBlockOptions } from '@iota/sdk';

@CommandHandler(RegisterTransactionCommand)
export class RegisterTransactionHandler
    implements ICommandHandler<RegisterTransactionCommand> {
    constructor(private readonly tangleService: TangleService) { }

    async execute(command: RegisterTransactionCommand): Promise<any> {
        const buildBlockOptions: IBuildBlockOptions = {
            output: {
                address: command.transactionData.address,
                amount: BigInt(command.transactionData.amount)
            }
        };

        return await this.tangleService.registerTransaction(buildBlockOptions);
    }
}