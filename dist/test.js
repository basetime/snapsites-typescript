"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./Client");
(async () => {
    const client = new Client_1.Client('123');
    const resp = await client.batchScreenshots('dyNmcmgxd4BFmuffdwCBV0', [
        {
            url: 'https://avagate.com',
            type: 'jpg',
        },
        {
            url: 'https://google.com',
            type: 'jpg',
        },
    ]);
    console.log(resp);
})();
//# sourceMappingURL=test.js.map