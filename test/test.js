// const { AYAMerchantSDK } = require("../dist/cjs/index.js");
import 'dotenv/config';
import { performance } from "perf_hooks";
import { AYAMerchantSDK } from "../dist/esm/index.js";

async function start() {
  const startTime = performance.now();
  const AyaMerchantClient = AYAMerchantSDK({
    baseUrl: process.env.baseUrl,
    appKey: process.env.appKey,
    secretKey: process.env.secretKey,
  })

  /**
   * @loadMethods
   * @loadMethods
   */
  // AyaMerchantClient
  //   .loadMethods()
  //   .then((response) => {
  //     console.log(
  //       JSON.stringify(response)
  //     )
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })

  const merchOrderId = "ORD-" + new Date().getTime().toString();
  console.log(merchOrderId)
  /**
   * @createPayment
   * @createPayment
   */
  AyaMerchantClient
    .createPayment({
      merchOrderId: merchOrderId,
      amount: "15000",
      userRef1: "Payment Testing",
      userRef2: "",
      userRef3: "",
      userRef4: "",
      userRef5: "",
      description: "",
      currencyCode: "104",
      channel: "mmqr",
      method: "QR",
      overrideFrontendRedirectUrl: ""
    })
    .then((response) => {
      const endTime = performance.now();
      const latencyMs = (endTime - startTime).toFixed(3);
      console.log(`\n--- Successful ---`);
      console.log(`**Network Latency: ${latencyMs} ms**`);
      console.log(`Response:`, response);
      console.log(`------------------------------\n`);
    })
    .catch((error) => {
      const endTime = performance.now();
      const latencyMs = (endTime - startTime).toFixed(3);
      console.log(`\n--- Failed ---`);
      console.log(`**Network Latency: ${latencyMs} ms**`);
      console.log(`Response:`, error);
      console.log(`------------------------------\n`);
    })
  // /**
  //  * @enquiryPayment
  //  * @enquiryPayment
  //  */
  // AyaMerchantClient
  //   .enquiryPayment({
  //     merchOrderId: "ORD-1763982113750",
  //   })
  //   .then((response) => {
  //     const endTime = performance.now();
  //     const latencyMs = (endTime - startTime).toFixed(3);
  //     console.log(`\n--- Successful ---`);
  //     console.log(`**Network Latency: ${latencyMs} ms**`);
  //     console.log(`Response:`, response);
  //     console.log(`------------------------------\n`);
  //   })
  //   .catch((error) => {
  //     const endTime = performance.now();
  //     const latencyMs = (endTime - startTime).toFixed(3);
  //     console.log(`\n--- Failed ---`);
  //     console.log(`**Network Latency: ${latencyMs} ms**`);
  //     console.log(`Response:`, error);
  //     console.log(`------------------------------\n`);
  //   })
}


start()
