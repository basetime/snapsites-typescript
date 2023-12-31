Snapsites Typescript
====================
Typescript client library for using Snapsites.io.

## Installation
Add the package to your project.

```sh
yarn add @basetime/snapsites-typescript
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
    const resp = await client.screenshotWait(endpointId, {
        browser: 'chromium',
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
  "statusUri": "http://api.snapsites.io/dyNmcmgxd4BFmuffdwCBV0/status/1917c524-044d-456b-b7af-4397499dade8",
  "beaconUri": "endpoints/dyNmcmgxd4BFmuffdwCBV0-8HcF7rATDipE4c5PCiL3q3-64zwGRCZindv5UXBXtc4fv",
  "images": [
    "https://storage.googleapis.com/cdn_snapsites_io/rhsV7rpKEyb6Ng1KxiDupA.jpeg"
  ],
  "pdfs": [],
  "results": []
}
```

HTML can also be sent instead of a URL.

```typescript
import { Client } from '@basetime/snapsites-typescript';

(async () => {
    const apiSecret = '123';
    const endpointId = 'dyNmcmgxd4BFmuffdwCBV0';

    const client = new Client(apiSecret);
    const resp = await client.screenshot(endpointId, {
        browser: 'chromium',
        html: '<!doctype html><html><body><h1>Hello World</h1></body></html>',
        type: 'jpg',
    });
})();
```

### batchScreenshots
Use the `batchScreenshotsWatch` method to take multiple screenshots at once.

```typescript
import { Client } from '@basetime/snapsites-typescript';

(async () => {
    const apiSecret = '123';
    const endpointId = 'dyNmcmgxd4BFmuffdwCBV0';

    // When sending batch requests, a unique key is required for each scrape page.
    const client = new Client(apiSecret);
    const resp = await client.batchScreenshotsWait(endpointId, [
        {
            browser: 'chromium',
            url: 'https://avagate.com',
            type: 'jpg',
        },
        {
            browser: 'firefox',
            url: 'https://avagate.com',
            type: 'jpg',
        }
    ]);
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
  "statusUri": "http://api.snapsites.io/dyNmcmgxd4BFmuffdwCBV0/status/1917c524-044d-456b-b7af-4397499dade8",
  "beaconUri": "endpoints/dyNmcmgxd4BFmuffdwCBV0-8HcF7rATDipE4c5PCiL3q3-64zwGRCZindv5UXBXtc4fv",
  "images": [
    "https://storage.googleapis.com/cdn_snapsites_io/rhsV7rpKEyb6Ng1KxiDup3.jpeg",
    "https://storage.googleapis.com/cdn_snapsites_io/5hs56rpKEyb6Ng1KxiDupA.jpeg"
  ],
  "pdfs": [],
  "results": []
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
    const resp = await client.batchScreenshotsWait(endpointId, [
        {
            url: 'https://google.com',
            type: 'jpg',
            options: {
                GoogleCloudStorage: {
                    filename: 'google.jpg'
                }
            }
        }
    ]);
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
    const resp = await client.screenshotWait(endpointId, {
        browser: 'chromium',
        url: 'https://avagate.com',
        type: 'jpg',
    });
    const status = await client.status(endpointId, resp.id);
    console.log(status);
})();
```

Outputs:

```json
{
    "id": "bffd4858-16fd-4c6a-827c-a312782ddb22",
    "status": "success",
    "beaconUri": "endpoints/dyNmcmgxd4BFmuffdwCBV0-8HcF7rATDipE4c5PCiL3q3-64zwGRCZindv5UXBXtc4fv",
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
    "results": [],
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

### Beacons
Normally, when a request is sent to the Snapsites API, the client will wait until all the screenshots are finished before returning with a response. You can change this behavior by setting the `wait` parameter to `false`, and then use beacons to get real time updates.

```typescript
import { Client } from '@basetime/snapsites-typescript';

(async () => {
    const apiSecret = '123';
    const endpointId = 'dyNmcmgxd4BFmuffdwCBV0';

    const client = new Client(apiSecret);
    const resp = await client.screenshot(endpointId, {
        browser: 'chromium',
        url: 'https://avagate.com',
        type: 'jpg',
    });

    const unsubscribe = client.onBeacon(resp, (beacon) => {
        console.log(beacon);
        if (beacon.status !== 'running') {
            unsubscribe();
        }
    });
})();
```

Which will produce output similar to this.

```
[ { message: 'Starting', updatedAt: '2023-12-18T19:22:20.461Z' } ]
[
  {
    message: 'Injecting script "https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js".',
    status: 'running',
    totalSteps: 3,
    currentStep: 1,
    updatedAt: '2023-12-18T19:22:21.251Z'
  }
]
[
  {
    message: 'Applying watermark.',
    status: 'running',
    totalSteps: 3,
    currentStep: 2,
    updatedAt: '2023-12-18T19:22:29.006Z'
  }
]
[
  {
    message: 'Uploading to Google Cloud Storage',
    status: 'running',
    totalSteps: 3,
    currentStep: 3,
    updatedAt: '2023-12-18T19:22:30.399Z'
  }
]
[
  {
    message: 'Saved in bucket cdn_snapsites_io at https://storage.googleapis.com/cdn_snapsites_io/nfeEpyv6yT6nmsv3HVw8Qc.jpeg',
    status: 'running',
    totalSteps: 3,
    currentStep: 3,
    updatedAt: '2023-12-18T19:22:32.819Z'
  }
]
[
  {
    message: 'Finished.',
    status: 'finished',
    totalSteps: 3,
    currentStep: 3,
    updatedAt: '2023-12-18T19:22:34.823Z'
  }
]
```

### Metadata
Metadata is a way to store arbitrary data with a screenshot request. Status updates and beacons will include the metadata. Clients can use the metadata to store information about the request, such as a database ID.

```typescript
(async () => {
    const apiSecret = '123';
    const endpointId = 'dyNmcmgxd4BFmuffdwCBV0';

    const client = new Client(apiSecret);
    const resp = await client.screenshot(endpointId, {
        browser: 'chromium',
        url: 'https://avagate.com',
        type: 'jpg',
        meta: '123',
    });
})();
```
