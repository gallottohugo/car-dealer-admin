import dotenv from 'dotenv';
import { cleanEnv, url, testOnly } from 'envalid';

dotenv.config({ debug: true, override: true });
const env = cleanEnv(process.env, {
    DATABASE_URL: url({ devDefault: testOnly('wss://example.value/') }),
})

export { env }
