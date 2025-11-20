# AYAMerchant SDK

A robust, dual-module (ESM and CJS) TypeScript SDK for interacting with the AYA Payment Merchant services. It provides methods for payment request, enquiry, service list retrieval, and callback verification.

## 📦 Installation

This package supports Node.js environments and is compatible with both `import` (ESM) and `require` (CJS) syntax.

```bash
npm install aya-merchant-sdk
```

## 🚀 Usage

### 1. Initialization

The SDK requires your merchant credentials (`baseUrl`, `appKey`, and `secretKey`) for initialization.
I cannot disclose API links here for confidentiality reasons but please connect with AYA innovation team for api base URL.

```typescript
import { AYAMerchantSDK, SDKOptions } from 'aya-merchant-sdk';

const options: SDKOptions = {
  baseUrl: 'https://api.example.com/payment', // Replace with actual base URL
  appKey: 'YOUR_APP_KEY',
  secretKey: 'YOUR_SECRET_KEY',
};

const merchantClient = AYAMerchantSDK(options);

// merchantClient is an instance of the AYAMerchant class
```

### 2. Loading Payment Methods (`loadMethods`)

Retrieves the list of available payment services.

```typescript
async function getMethods() {
  try {
    const methods = await merchantClient.loadMethods();
    console.log('Available Methods:', methods);
  } catch (error) {
    console.error(error);
  }
}
```

### 3. Creating a Payment Request (`createPayment`)

Initiates a payment transaction.

```typescript
// Note: Interfaces are defined in src/index.ts and are auto-exported
const paymentPayload = {
  merchOrderId: 'ORD-' + Date.now(),
  amount: '1000.00',
  appKey: options.appKey,
  timestamp: Date.now().toString(), // Must be a string
  userRef1: 'user-123',
  userRef2: 'ref-2',
  userRef3: 'ref-3',
  userRef4: 'ref-4',
  userRef5: 'ref-5',
  description: 'Product Purchase',
  currencyCode: 'MMK',
  channel: 'WEB', // or other valid channel
  method: 'VISA', // or other valid method key
  overrideFrontendRedirectUrl: 'https://your-site.com/callback',
  checkSum: '' // Checksum is generated internally by the SDK
};

async function initiatePayment() {
  try {
    const response = await merchantClient.createPayment(paymentPayload);
    console.log('Payment Response:', response);
  } catch (error) {
    console.error(error);
  }
}
```

### 4. Enquiry Payment Status (`enquiryPayment`)

Checks the status of a specific order ID and decodes the response payload.

```typescript
async function checkStatus(orderId: string) {
  try {
    const enquiry = await merchantClient.enquiryPayment({ merchOrderId: orderId });
    console.log('Decoded Enquiry Data:', enquiry);
    // enquiry is of type EnquiryDecodedResponse
  } catch (error) {
    console.error(error);
  }
}
```

### 5. Verifying Callbacks (`verifyCallback`)

Verifies the integrity of a payment callback notification from the gateway.

```typescript
// This data typically comes from the HTTP request body of the callback endpoint
async function handleCallback(callbackData: { payload: string, merchOrderId: string, checkSum: string }) {
  const isValid = await merchantClient.verifyCallback(callbackData);

  if (isValid) {
    console.log('Callback signature is valid. Processing payment update...');
    // Decode and process the payload if verification passes
    const decodedPayload = JSON.parse(Buffer.from(callbackData.payload, 'base64').toString('utf-8'));
    // Further logic to update database...
  } else {
    console.log('Callback signature is INVALID. Rejecting request.');
  }
}
```

## 🛠️ Developer Setup & Build

This project uses a TypeScript configuration designed for modern dual-module support.

### Prerequisites
- Node.js
- TypeScript (`package.json` handles installation)

### Build Commands

The `build` script executes a multi-step process to produce the necessary files for both CJS and ESM consumers:

| Output File | Module Type | Configuration |
| :--- | :--- | :--- |
| `dist/index.js` | ES Module (`import`) | `tsconfig.json` |
| `dist/index.cjs` | CommonJS (`require`) | `tsconfig.cjs.json` |
| `dist/index.d.ts` | TypeScript Definitions | `tsconfig.json` |

To build the project, run:

```bash
npm run build
```

This sequence ensures the CJS file is compiled, renamed, and then the final ESM and type definition files are generated.
