// src/tangle/blockchain.controller.ts
import { Controller, Get } from '@nestjs/common';
import { TangleService } from './tangle.service';
import { CustomController } from '../common/controllers/custom.controller';

@Controller('blockchain')
export class BlockchainController extends CustomController {
    constructor(private readonly tangleService: TangleService) {
        super();
    }

    @Get('node-info')
    async getNodeInfo() {
        const nodeInfo = await this.tangleService.getNodeInfo();
        return this.OkOrBadRequest(nodeInfo);
    }
}