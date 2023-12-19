"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./Client");
(async () => {
    const client = new Client_1.Client('123', false);
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
    /*const resp = await client.screenshot('dyNmcmgxd4BFmuffdwCBV0', {
      url: 'https://avagate.com',
      type: 'jpg',
    });*/
    console.log(resp);
    client.onBeacon(resp.beaconUri, (beacon) => console.log(beacon));
})();
//# sourceMappingURL=test.js.map