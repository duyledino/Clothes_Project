import type { Puter } from '@heyputer/puter.js';
//@ts-ignore
import { init } from '@heyputer/puter.js/src/init.cjs';

const puterAuthToken = process.env.PUTTER_AUTH_TOKEN || '';

export const puter = init(puterAuthToken) as Puter;