// src/tangle/services/node.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@iota/sdk';
import { ApiResponseHelper } from '@app/common/responses/api-response.helper';
import { ApiResponse } from '@app/common/responses/api-response';
import { ApiErrorCode } from '@app/common/enums/api-error-code.enum';
import { INodeService } from '../interfaces/node-service.interface';

@Injectable()
export class NodeService implements INodeService {
    private readonly client: Client;
    private readonly logger = new Logger(NodeService.name);

    constructor() {
        this.client = new Client({
            nodes: ['http://3.92.78.140:14265'], // Nodo de IOTA
        });
    }

    async getNodeInfo(): Promise<ApiResponse<any>> {
        try {
            const info = await this.client.getInfo();
            this.logger.log('Node Info:', JSON.stringify(info));
            return ApiResponseHelper.createSuccessResponse(info, 'Node information retrieved successfully.');
        } catch (error) {
            this.logger.error('Error retrieving node info', error);
            return ApiResponseHelper.createErrorResponse<any>(
                'Error retrieving node info.',
                500,
                [{ code: ApiErrorCode.NetworkError.toString(), description: error.message }]
            );
        }
    }
}
