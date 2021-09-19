import { AccountRoutes  } from '@modules/api/v1/accounts'
import { ThreadsRoutes } from "@modules/api/v1/threads";
import { createSocket } from  '@modules/api/v1/sockets';

export const ApiV1 = {
    accounts: AccountRoutes,
    threads: ThreadsRoutes,
    sockets: createSocket
}
