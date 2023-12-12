import { Client } from './Client';

(async () => {
  const client = new Client('123', '123');
  const resp = await client.screenshot('dyNmcmgxd4BFmuffdwCBV0', {
    url: 'https://avagate.com',
    type: 'jpg',
  });
  console.log(resp);
})();
