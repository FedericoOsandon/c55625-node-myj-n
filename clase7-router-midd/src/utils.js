import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(dirname(__filename));


// este archivo es para los que usan import type module