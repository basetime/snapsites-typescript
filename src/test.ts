import { Client } from './Client';

(async () => {
  const client = new Client('123');
  const resp = await client.batchScreenshots('dyNmcmgxd4BFmuffdwCBV0', {
    first: {
      url: 'https://avagate.com',
      type: 'jpg',
    },
    second: {
      url: 'https://google.com',
      type: 'jpg',
    },
  });
  console.log(resp);
})();
