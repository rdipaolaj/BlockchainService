import { Injectable, NestMiddleware } from '@nestjs/common';
import { SecurityHeadersBuilder } from './security-headers-builder';

@Injectable()
export class SecurityHeadersMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const policy = new SecurityHeadersBuilder()
            .addContentTypeOptionsNoSniff()
            .addXFrameOptionsDeny()
            .addStrictTransportSecurity()
            .addXssProtectionBlock()
            .removeServerHeader()
            .build();

        // Aplicar las cabeceras
        Object.keys(policy.setHeaders).forEach((header) => {
            res.setHeader(header, policy.setHeaders[header]);
        });

        // Eliminar cabeceras si es necesario
        policy.removeHeaders.forEach((header) => {
            res.removeHeader(header);
        });

        next();
    }
}