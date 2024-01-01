import { Client } from './Client';

(async () => {
  const client = new Client();
  const resp = await client.batchScreenshots('dyNmcmgxd4BFmuffdwCBV0', '123', [
    {
      url: 'https://avagate.com',
      type: 'jpg',
    },
    {
      url: 'https://google.com',
      type: 'jpg',
    },
  ]);

  /*const resp = await client.screenshot('dyNmcmgxd4BFmuffdwCBV0', '123', {
    url: 'https://avagate.com',
    type: 'jpg',
  });*/
  console.log(resp);

  client.onBeacon(resp, (beacon) => console.log(beacon));
})();
