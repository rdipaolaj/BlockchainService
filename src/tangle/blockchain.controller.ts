// src/tangle/blockchain.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterTransactionDto } from '../application/commands/dtos/register-transaction.dto';
import { RegisterTransactionCommand } from '../application/commands/register-transaction.command';
import { GetNodeInfoQuery } from '../application/queries/get-node-info.query';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CustomController } from '../common/controllers/custom.controller';

@ApiTags('blockchain')
@Controller('blockchain')
export class BlockchainController extends CustomController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {
        super();
    }

    @Get('node-info')
    async getNodeInfo() {
        const query = new GetNodeInfoQuery();
        const nodeInfo = await this.queryBus.execute(query);
        return this.OkOrBadRequest(nodeInfo);
    }

    @Post('register-transaction')
    @ApiBody({
        description: 'Registrar una transacción en Tangle',
        type: RegisterTransactionDto,
    })
    async registerTransaction(@Body() transactionDto: RegisterTransactionDto) {
        const command = new RegisterTransactionCommand(transactionDto.transactionData, transactionDto.tag);
        const result = await this.commandBus.execute(command);
        return this.OkOrBadRequest(result);
    }
}