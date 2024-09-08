export class SecurityHeadersPolicy {
    // Diccionario para las cabeceras que deben ser establecidas
    public setHeaders: { [key: string]: string } = {};

    // Conjunto para las cabeceras que deben ser eliminadas
    public removeHeaders: string[] = [];
}