Snapsites Typescript
====================
Typescript client library for using Snapsites.io.

## Installation
Add the github path to your `package.json` file.
```json
{
    "dependencies": {
        "@basetime/snapsites-typescript": "git@github.com:basetime/snapsites-typescript.git"
    }
}
```

And then run `pnpm install`.

## Usage
Use the `screenshot` method to take a screenshot of a website.

```typescript
import { Client } from '@basetime/snapsites-typescript';

(async () => {
    const apiKey = '123';
    const apiSecret = '123';
    const endpointId = 'dyNmcmgxd4BFmuffdwCBV0';

    const client = new Client(apiKey, apiSecret);
    const resp = await client.screenshot(endpointId, {
        url: 'https://avagate.com',
        type: 'jpg',
    });
    console.log(resp);
})();
```

Outputs:

```json
{
  "id": "1917c524-044d-456b-b7af-4397499dade8",
  "time": 13085,
  "cost": -0.1,
  "balance": 9492.2,
  "status": "http://api.snapsites.io/status/1917c524-044d-456b-b7af-4397499dade8",
  "images": {
    "0": "https://storage.googleapis.com/cdn_snapsites_io/rhsV7rpKEyb6Ng1KxiDupA.jpeg"
  },
  "pdfs": {}
}
```

Use the `batchScreenshots` method to take multiple screenshots at once.

```typescript
import { Client } from '@basetime/snapsites-typescript';

(async () => {
    const apiKey = '123';
    const apiSecret = '123';
    const endpointId = 'dyNmcmgxd4BFmuffdwCBV0';

    // When sending batch requests, a unique key is required for each scrape page.
    const client = new Client(apiKey, apiSecret);
    const resp = await client.batchScreenshots(endpointId, {
        'avagate': {
            url: 'https://avagate.com',
            type: 'jpg',
        },
        'google': {
            url: 'https://google.com',
            type: 'jpg',
        }
    });
    console.log(resp);
})();
```

The response will be a map of the unique keys to the screenshot response.

Outputs:

```json
{
  "id": "1917c524-044d-456b-b7af-4397499dade8",
  "time": 13085,
  "cost": -0.1,
  "balance": 9492.2,
  "status": "http://api.snapsites.io/status/1917c524-044d-456b-b7af-4397499dade8",
  "images": {
    "avagate": "https://storage.googleapis.com/cdn_snapsites_io/rhsV7rpKEyb6Ng1KxiDup3.jpeg",
    "google": "https://storage.googleapis.com/cdn_snapsites_io/5hs56rpKEyb6Ng1KxiDupA.jpeg"
  },
  "pdfs": {}
}
```
