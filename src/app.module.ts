// src/app.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NodeService } from './tangle/services/node.service';
import { TransactionService } from './tangle/services/transaction.service';
import { RegisterTransactionHandler } from './application/commands/handlers/register-transaction.handler';
import { GetNodeInfoHandler } from './application/queries/handlers/get-node-info.handler';
import { BlockchainController } from './tangle/blockchain.controller';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { GlobalExceptionHandler } from './common/exceptions/global-exception-handler';
import { NODE_SERVICE, TRANSACTION_SERVICE } from './tangle/constants/tangle-service-token';


@Module({
  imports: [CqrsModule],
  controllers: [BlockchainController],
  providers: [
    {
      provide: NODE_SERVICE, // Usa el símbolo en lugar del string
      useClass: NodeService,
    },
    {
      provide: TRANSACTION_SERVICE, // Usa el símbolo en lugar del string
      useClass: TransactionService,
    },
    RegisterTransactionHandler,
    GetNodeInfoHandler,
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionHandler,
    },
  ],
})
export class AppModule {}