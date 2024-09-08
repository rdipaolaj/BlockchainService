import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TangleService } from './tangle/tangle.service';
import { RegisterTransactionHandler } from './application/commands/handlers/register-transaction.handler';
import { BlockchainController } from './tangle/blockchain.controller';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { GlobalExceptionHandler } from './common/exceptions/global-exception-handler';

@Module({
  imports: [CqrsModule],
  controllers: [BlockchainController],
  providers: [
    TangleService,
    RegisterTransactionHandler,
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe, // Registro del ValidationPipe globalmente
    },
    {
      provide: 'APP_FILTER', // Registro global del filtro de excepciones
      useClass: GlobalExceptionHandler,
    },
  ],
})
export class AppModule {}