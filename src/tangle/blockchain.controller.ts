// src/tangle/blockchain.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterTransactionDto } from '../application/commands/dtos/register-transaction.dto';
import { RegisterTransactionCommand } from '../application/commands/register-transaction.command';
import { GetNodeInfoQuery } from '../application/queries/get-node-info.query';
import { RetrieveTransactionQuery } from '../application/queries/retrieve-transaction.query';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
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

    @Get('retrieve-transaction')
    @ApiQuery({ name: 'blockId', required: true, description: 'ID del bloque a recuperar' })
    async retrieveTransaction(@Query('blockId') blockId: string) {
        const query = new RetrieveTransactionQuery(blockId);
        const result = await this.queryBus.execute(query);
        return this.OkOrBadRequest(result);
    }
}