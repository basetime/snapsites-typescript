import { Client } from './Client';

(async () => {
  const client = new Client('123', false);
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
