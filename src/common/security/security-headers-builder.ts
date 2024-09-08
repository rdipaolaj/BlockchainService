import { SecurityHeadersPolicy } from './security-headers-policy';

export class SecurityHeadersBuilder {
    private readonly policy = new SecurityHeadersPolicy();

    addContentTypeOptionsNoSniff() {
        this.policy.setHeaders['X-Content-Type-Options'] = 'nosniff';
        return this;
    }

    addXFrameOptionsDeny() {
        this.policy.setHeaders['X-Frame-Options'] = 'DENY';
        return this;
    }

    addStrictTransportSecurity(maxAge: number = 31536000, includeSubDomains: boolean = true) {
        this.policy.setHeaders['Strict-Transport-Security'] = includeSubDomains
            ? `max-age=${maxAge}; includeSubDomains`
            : `max-age=${maxAge}`;
        return this;
    }

    addXssProtectionBlock() {
        this.policy.setHeaders['X-XSS-Protection'] = '1; mode=block';
        return this;
    }

    removeServerHeader() {
        this.policy.removeHeaders.push('Server');
        return this;
    }

    build(): SecurityHeadersPolicy {
        return this.policy;
    }
}