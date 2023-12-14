Snapsites Typescript
====================
Typescript client library for using Snapsites.io.

## Installation
Add the GitHub path to your `package.json` file.
```json
{
    "dependencies": {
        "@basetime/snapsites-typescript": "git@github.com:basetime/snapsites-typescript.git"
    }
}
```

And then run `pnpm install`.

## Usage
An API key and secret are required to use the client.

### screenshot
Use the `screenshot` method to take a screenshot of a website.

```typescript
import { Client } from '@basetime/snapsites-typescript';

(async () => {
    const apiSecret = '123';
    const endpointId = 'dyNmcmgxd4BFmuffdwCBV0';

    const client = new Client(apiSecret);
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
  "status": "http://api.snapsites.io/dyNmcmgxd4BFmuffdwCBV0/status/1917c524-044d-456b-b7af-4397499dade8",
  "images": {
    "0": "https://storage.googleapis.com/cdn_snapsites_io/rhsV7rpKEyb6Ng1KxiDupA.jpeg"
  },
  "pdfs": {}
}
```

### batchScreenshots
Use the `batchScreenshots` method to take multiple screenshots at once.

```typescript
import { Client } from '@basetime/snapsites-typescript';

(async () => {
    const apiSecret = '123';
    const endpointId = 'dyNmcmgxd4BFmuffdwCBV0';

    // When sending batch requests, a unique key is required for each scrape page.
    const client = new Client(apiSecret);
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
  "status": "http://api.snapsites.io/dyNmcmgxd4BFmuffdwCBV0/status/1917c524-044d-456b-b7af-4397499dade8",
  "images": {
    "avagate": "https://storage.googleapis.com/cdn_snapsites_io/rhsV7rpKEyb6Ng1KxiDup3.jpeg",
    "google": "https://storage.googleapis.com/cdn_snapsites_io/5hs56rpKEyb6Ng1KxiDupA.jpeg"
  },
  "pdfs": {}
}
```

Some integrations may require request-time configuration. For example, you may want to tell the Google Cloud Storage integration which filename to use. You can do this by passing the `options` parameter.

```typescript
import { Client } from '@basetime/snapsites-typescript';

(async () => {
    const apiSecret = '123';
    const endpointId = 'dyNmcmgxd4BFmuffdwCBV0';

    // When sending batch requests, a unique key is required for each scrape page.
    const client = new Client(apiSecret);
    const resp = await client.batchScreenshots(endpointId, {
        'google': {
            url: 'https://google.com',
            type: 'jpg',
            options: {
                GoogleCloudStorage: {
                    filename: 'google.jpg'
                }
            }
        }
    });
    console.log(resp);
})();
```

### status
Use the `status` method to get the status of a screenshot request.

```typescript
import { Client } from '@basetime/snapsites-typescript';

(async () => {
    const apiSecret = '123';
    const endpointId = 'dyNmcmgxd4BFmuffdwCBV0';
    const requestId = '1917c524-044d-456b-b7af-4397499dade8';

    const client = new Client(apiSecret);
    const resp = await client.status(endpointId, requestId);
    console.log(resp);
})();
```

Outputs:

```json
{
    "id": "bffd4858-16fd-4c6a-827c-a312782ddb22",
    "status": "success",
    "currentStep": 4,
    "totalSteps": 4,
    "cost": -0.2,
    "images": {
        "first": "https://storage.googleapis.com/cdn_snapsites_io/vsBL31sgW95SCv4fDYxSU2.jpeg",
        "second": "https://storage.googleapis.com/cdn_snapsites_io/vzmbLxv7vp6vkqnhcD1995.jpeg"
    },
    "pdfs": {},
    "logs": [
        "[2023-12-13T02:15:29.829Z] debug: Injected script \"https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js\".",
        "[2023-12-13T02:15:29.832Z] debug: Injected internal script.",
        "[2023-12-13T02:15:39.613Z] debug: Saved in bucket cdn_snapsites_io at https://storage.googleapis.com/cdn_snapsites_io/vsBL31sgW95SCv4fDYxSU2.jpeg",
        "[2023-12-13T02:15:29.818Z] debug: Injected script \"https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js\".",
        "[2023-12-13T02:15:29.822Z] debug: Injected internal script.",
        "[2023-12-13T02:15:43.504Z] debug: Saved in bucket cdn_snapsites_io at https://storage.googleapis.com/cdn_snapsites_io/vzmbLxv7vp6vkqnhcD1995.jpeg"
    ],
    "request": {
        "first": {
            "url": "https://avagate.com",
            "type": "jpg"
        },
        "second": {
            "url": "https://google.com",
            "type": "jpg"
        }
    }
}
```
