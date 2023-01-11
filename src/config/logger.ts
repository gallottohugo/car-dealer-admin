import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino({
    level: 'debug',
});

const pinoMiddleware = pinoHttp({ logger: logger })

export { logger, pinoMiddleware };
