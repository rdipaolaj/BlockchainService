// src/app.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NodeService } from './tangle/services/node.service';
import { TransactionService } from './tangle/services/transaction.service';
import { TransactionVerificationService } from './tangle/services/transaction-verification.service'; // Importa el servicio de verificación
import { RegisterTransactionHandler } from './application/commands/handlers/register-transaction.handler';
import { GetNodeInfoHandler } from './application/queries/handlers/get-node-info.handler';
import { RetrieveTransactionHandler } from './application/queries/handlers/retrieve-transaction.handler'; // Importa el handler de verificación
import { BlockchainController } from './tangle/blockchain.controller';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { GlobalExceptionHandler } from './common/exceptions/global-exception-handler';
import { NODE_SERVICE, TRANSACTION_SERVICE } from './tangle/constants/tangle-service-token';

@Module({
  imports: [CqrsModule],
  controllers: [BlockchainController],
  providers: [
    {
      provide: NODE_SERVICE,
      useClass: NodeService,
    },
    {
      provide: TRANSACTION_SERVICE,
      useClass: TransactionService,
    },
    TransactionVerificationService, // Inyectamos el servicio directamente
    RegisterTransactionHandler,
    GetNodeInfoHandler,
    RetrieveTransactionHandler, // Inyectamos el handler directamente
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionHandler,
    },
  ],
})
export class AppModule {}
