// src/application/queries/handlers/get-node-info.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetNodeInfoQuery } from '../get-node-info.query';
import { INodeService } from '@app/tangle/interfaces/node-service.interface';
import { NODE_SERVICE } from '@app/tangle/constants/tangle-service-token';

@QueryHandler(GetNodeInfoQuery)
export class GetNodeInfoHandler implements IQueryHandler<GetNodeInfoQuery> {
    constructor(
        @Inject(NODE_SERVICE) // Usa el token para inyectar el servicio correcto
        private readonly nodeService: INodeService
    ) { }

    async execute(query: GetNodeInfoQuery): Promise<any> {
        return await this.nodeService.getNodeInfo();
    }
}