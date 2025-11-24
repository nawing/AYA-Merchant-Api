import axios from 'axios';
import crypto from 'crypto';

/**
 * @EnquiryPayment
 * @EnquiryPayment
 * @EnquiryPayment
 */
export interface EnquiryRequest {
  merchOrderId: string;
}
export interface EnquiryResponse {
  message: string;
  status: string;
  data: {
    payload: string;
    merchOrderId: string;
    checkSum: string;
  }
}
export interface EnquiryDecodedResponse {
  merchOrderId: string;
  tranId: string;
  amount: string;
  currencyCode: string;
  statusCode: string;
  paymentCardNumber: string;
  paymentMobileNumber: string;
  cardTypeName: string;
  cardExpiryDate: string;
  nameOnCard: string;
  approvalCode: string;
  tranRef: string;
  userRef1: string;
  userRef2: string;
  userRef3: string;
  userRef4: string;
  userRef5: string;
  description: string;
  dateTime: string;
}
/**
 * @CreatePayment
 * @CreatePayment
 * @CreatePayment
 */
export interface PaymentRequest {
  merchOrderId: string;
  amount: string;
  userRef1: string;
  userRef2: string;
  userRef3: string;
  userRef4: string;
  userRef5: string;
  description: string;
  currencyCode: string;
  channel: string;
  method: string;
  overrideFrontendRedirectUrl: string;
  appKey?: string;
  checkSum?: string;
}
export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  qr?: string;
  url?: string;
  error?: string;
}
/**
 * @PaymentLists
 * @PaymentLists
 * @PaymentLists
 */
export interface PaymentServiceResponse {
  name: string;
  key: string;
  image_url: string;
  methods: 'WEB' | 'QR' | 'NOTI'[]
}
/**
 * @Callbacks
 * @Callbacks
 * @Callbacks
 */
export interface CallbackRequest {
  payload: string;
  merchOrderId: string;
  checkSum: string;
}
export interface CallbackDecodedPayload {
  merchOrderId: string;
  tranId: string;
  amount: string;
  currencyCode: string;
  statusCode: string;
  paymentCardNumber: string;
  paymentMobileNumber: string;
  cardTypeName: string;
  cardExpiryDate: string;
  nameOnCard: string;
  approvalCode: string;
  tranRef: string;
  userRef1: string;
  userRef2: string;
  userRef3: string;
  userRef4: string;
  userRef5: string;
  description: string;
  dateTime: string;
}
/**
 * @SDKOptions
 * @SDKOptions
 * @SDKOptions
 */
export interface SDKOptions {
  baseUrl: string;
  appKey: string;
  secretKey: string;
}
/**
 * @AYAMerchantSDK
 * @AYAMerchantSDK
 * @AYAMerchantSDK
 * @param {SDKOptions} options
 * @returns {AYAMerchantClass} A status message string.
 */
export function AYAMerchantSDK(options: SDKOptions): AYAMerchantClass {
  return new AYAMerchantClass({
    baseUrl: options.baseUrl,
    appKey: options.appKey,
    secretKey: options.secretKey,
  })
}
/**
 * @AYAMerchantClass
 * @AYAMerchantClass
 * @AYAMerchantClass
 */
class AYAMerchantClass {

  readonly #baseUrl: string;
  readonly #appKey: string;
  readonly #secretKey: string;

  constructor(options: SDKOptions) {
    this.#baseUrl = options.baseUrl;
    this.#appKey = options.appKey;
    this.#secretKey = options.secretKey;
  }
  /**
   * loadMethods
   * @returns {PaymentServiceResponse[]}
   */
  public async loadMethods(): Promise<PaymentServiceResponse[]> {
    try {
      const timestamp = new Date().getTime();
      const signature = this.sumCheckLoadMethods(timestamp.toString());
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = {
        appKey: this.#appKey,
        timestamp: timestamp,
        checkSum: signature
      }
      const response = await axios.post(`${this.#baseUrl}/v1/payment/services`, body, config);
      return response.data;
    } catch (error) {
      console.error(error)
      throw new Error("AYAConnect.loadMethods()");
    }
  }
  /**
   * createPayment
   * @param {PaymentRequest} payload
   * @param {string} payload.merchOrderId
   * @param {string} payload.amount
   * @param {string} payload.userRef1
   * @param {string} payload.userRef2
   * @param {string} payload.userRef3
   * @param {string} payload.userRef4
   * @param {string} payload.userRef5
   * @param {string} payload.description
   * @param {string} payload.currencyCode
   * @param {string} payload.channel
   * @param {string} payload.method
   * @param {string} payload.overrideFrontendRedirectUrl
   * @returns {PaymentResponse}
   */
  public async createPayment(payload: PaymentRequest): Promise<PaymentResponse> {
    try {
      const timestamp = new Date().getTime();
      const signature = this.sumCheckPayRequest(
        payload.merchOrderId,
        payload.amount,
        timestamp,
        payload.userRef1,
        payload.userRef2,
        payload.userRef3,
        payload.userRef4,
        payload.userRef5,
        payload.description,
        payload.currencyCode,
        payload.channel,
        payload.method,
        payload.overrideFrontendRedirectUrl,
      );
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      const body = {
        merchOrderId: payload.merchOrderId,
        amount: payload.amount,
        appKey: this.#appKey,
        timestamp: timestamp,
        userRef1: payload.userRef1,
        userRef2: payload.userRef2,
        userRef3: payload.userRef3,
        userRef4: payload.userRef4,
        userRef5: payload.userRef5,
        description: payload.description,
        currencyCode: payload.currencyCode,
        channel: payload.channel,
        method: payload.method,
        overrideFrontendRedirectUrl: payload.overrideFrontendRedirectUrl,
        checkSum: signature
      }
      const response = await axios.post(`${this.#baseUrl}/v1/payment/request`, body, config);
      const extracted = this.extractDataByValuePattern(response.data);
      return {
        success: true,
        qr: extracted.qrLink,
        transactionId: extracted.tranId,
      }
    } catch (error) {
      console.error(error)
      throw new Error("AYAConnect.createPayment()");
    }
  }
  /**
   * createPaymentRedirect
   * @param {PaymentRequest} payload
   * @param {string} payload.merchOrderId
   * @param {string} payload.amount
   * @param {string} payload.userRef1
   * @param {string} payload.userRef2
   * @param {string} payload.userRef3
   * @param {string} payload.userRef4
   * @param {string} payload.userRef5
   * @param {string} payload.description
   * @param {string} payload.currencyCode
   * @param {string} payload.channel
   * @param {string} payload.method
   * @param {string} payload.overrideFrontendRedirectUrl
   * @returns {PaymentResponse}
   */
  public async createPaymentRedirect(payload: PaymentRequest): Promise<any> {
    try {
      const timestamp = new Date().getTime();
      const signature = this.sumCheckPayRequest(
        payload.merchOrderId,
        payload.amount,
        timestamp,
        payload.userRef1,
        payload.userRef2,
        payload.userRef3,
        payload.userRef4,
        payload.userRef5,
        payload.description,
        payload.currencyCode,
        payload.channel,
        payload.method,
        payload.overrideFrontendRedirectUrl,
      );
      const body = {
        merchOrderId: payload.merchOrderId,
        amount: payload.amount,
        appKey: this.#appKey,
        timestamp: timestamp,
        userRef1: payload.userRef1,
        userRef2: payload.userRef2,
        userRef3: payload.userRef3,
        userRef4: payload.userRef4,
        userRef5: payload.userRef5,
        description: payload.description,
        currencyCode: payload.currencyCode,
        channel: payload.channel,
        method: payload.method,
        overrideFrontendRedirectUrl: payload.overrideFrontendRedirectUrl,
        checkSum: signature
      }
      return body;
    } catch (error) {
      console.error(error)
      throw new Error("AYAConnect.createPayment()");
    }
  }
  /**
   * enquiryPayment
   * @param {EnquiryRequest} payload
   * @param {string} payload.merchOrderId
   * @returns {EnquiryDecodedResponse}
   */
  public async enquiryPayment(payload: EnquiryRequest): Promise<EnquiryDecodedResponse> {
    try {
      const timestamp = new Date().getTime();
      const signature = this.sumCheckEnquiry(payload.merchOrderId, timestamp.toString());
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = {
        merchOrderId: payload.merchOrderId,
        appKey: this.#appKey,
        timestamp: timestamp,
        checkSum: signature
      }
      const response = await axios.post(`${this.#baseUrl}/v1/payment/enquiry`, body, config);
      const enquiryResponse = response.data as EnquiryResponse;
      const jsonString = Buffer.from(enquiryResponse.data.payload, 'base64').toString('utf-8');
      const jsonObject = JSON.parse(jsonString) as EnquiryDecodedResponse;
      return jsonObject;
    } catch (error) {
      console.error(error)
      throw new Error("AYAConnect.loadMethods()");
    }
  }
  /**
   * verifyCallback
   * @param {CallbackRequest} options
   * @param {string} options.payload
   * @param {string} options.merchOrderId
   * @param {string} options.checkSum
   * @returns {CallbackDecodedRespoonse}
   */
  public async verifyCallback(options: CallbackRequest): Promise<boolean> {
    const {payload, merchOrderId, checkSum} = options as CallbackRequest;
    const jsonString = Buffer.from(payload, 'base64').toString('utf-8');
    const jsonObject = JSON.parse(jsonString) as CallbackDecodedPayload;
    const signature = this.sumCheckCallback(
      jsonObject.merchOrderId,
      jsonObject.tranId,
      jsonObject.amount,
      jsonObject.currencyCode,
      jsonObject.statusCode,
      jsonObject.paymentCardNumber,
      jsonObject.paymentMobileNumber,
      jsonObject.cardTypeName,
      jsonObject.cardExpiryDate,
      jsonObject.nameOnCard,
      jsonObject.approvalCode,
      jsonObject.tranRef,
      jsonObject.userRef1,
      jsonObject.userRef2,
      jsonObject.userRef3,
      jsonObject.userRef4,
      jsonObject.userRef5,
      jsonObject.description,
      jsonObject.dateTime,
    );
    return (signature === checkSum) ? true : false
  }
  /**
   * sumCheckLoadMethods
   * @param {string} nonce
   * @returns {string}
   */
  public sumCheckLoadMethods(nonce: string): string {
    const stringToSign = `${this.#appKey}:${this.#secretKey}:${nonce}`;
    return crypto.createHmac('sha256', this.#secretKey)
      .update(stringToSign)
      .digest('hex');
  }
  /**
   * sumCheckPayRequest
   * @param {string} merchOrderId
   * @param {string} amount
   * @param {string} appKey
   * @param {number} timestamp
   * @param {string} userRef1
   * @param {string} userRef2
   * @param {string} userRef3
   * @param {string} userRef4
   * @param {string} userRef5
   * @param {string} description
   * @param {string} currencyCode
   * @param {string} channel
   * @param {string} method
   * @param {string} overrideFrontendRedirectUrl
   * @returns {string}
   */
  public sumCheckPayRequest(
    merchOrderId: string,
    amount: string,
    timestamp: number,
    userRef1: string,
    userRef2: string,
    userRef3: string,
    userRef4: string,
    userRef5: string,
    description: string,
    currencyCode: string,
    channel: string,
    method: string,
    overrideFrontendRedirectUrl: string,
  ): string {
    const stringToSign = [
      merchOrderId,
      amount,
      this.#appKey,
      timestamp,
      userRef1,
      userRef2,
      userRef3,
      userRef4,
      userRef5,
      description,
      currencyCode,
      channel,
      method,
      overrideFrontendRedirectUrl
    ].join(':');
    return crypto.createHmac('sha256', this.#secretKey)
      .update(stringToSign)
      .digest('hex');
  }
  /**
   * sumCheckEnquiry
   * @param {string} merchOrderId
   * @param {string} nonce
   * @returns {string}
   */
  public sumCheckEnquiry(merchOrderId: string, nonce: string): string {
    const stringToSign = `${merchOrderId}:${nonce}:${this.#appKey}`;
    return crypto.createHmac('sha256', this.#secretKey)
      .update(stringToSign)
      .digest('hex');
  }
  /**
   * sumCheckCallback
   * @param {string} merchOrderId
   * @param {string} tranId
   * @param {string} amount
   * @param {string} currencyCode
   * @param {string} statusCode
   * @param {string} paymentCardNumber
   * @param {string} paymentMobileNumber
   * @param {string} cardTypeName
   * @param {string} cardExpiryDate
   * @param {string} nameOnCard
   * @param {string} approvalCode
   * @param {string} tranRef
   * @param {string} userRef1
   * @param {string} userRef2
   * @param {string} userRef3
   * @param {string} userRef4
   * @param {string} userRef5
   * @param {string} description
   * @param {string} dateTime
   * @returns {string}
   */
  public sumCheckCallback(
    merchOrderId: string,
    tranId: string,
    amount: string,
    currencyCode: string,
    statusCode: string,
    paymentCardNumber: string,
    paymentMobileNumber: string,
    cardTypeName: string,
    cardExpiryDate: string,
    nameOnCard: string,
    approvalCode: string,
    tranRef: string,
    userRef1: string,
    userRef2: string,
    userRef3: string,
    userRef4: string,
    userRef5: string,
    description: string,
    dateTime: string
  ): string {
    const stringToSign = [
      merchOrderId,
      tranId,
      amount,
      currencyCode,
      statusCode,
      paymentCardNumber,
      paymentMobileNumber,
      cardTypeName,
      cardExpiryDate,
      nameOnCard,
      approvalCode,
      tranRef,
      userRef1,
      userRef2,
      userRef3,
      userRef4,
      userRef5,
      description,
      dateTime
    ].join(':');
    return crypto.createHmac('sha256', this.#secretKey)
      .update(stringToSign)
      .digest('hex');
  }

  /**
   * extractDataByValuePattern
   * @param {string} sourceString The raw HTML or content string to parse.
   * @returns An object containing the extracted values.
   */
  extractDataByValuePattern(sourceString: string): {tranId: string, qrLink: string} {
    const scriptTagRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    const tranIdRegex = /([A-Za-z]\d{5,30})/g;
    const qrLinkRegex = /(['"])\s*000201\s*(.*?com\.mmqrpay.*?)\s*\1/s;
    let tranId: string | null = null;
    let qrLink: string | null = null;

    let match;
    while ((match = scriptTagRegex.exec(sourceString)) !== null) {
      const scriptContent = match[1];
      if (tranId === null) {
        const tranIdMatch = scriptContent.match(tranIdRegex);
        if (tranIdMatch && tranIdMatch[2]) {
          tranId = tranIdMatch[2];
        }
      }
      if (qrLink === null) {
        const qrLinkMatch = scriptContent.match(qrLinkRegex);
        if (qrLinkMatch && qrLinkMatch[2]) {
          qrLink = qrLinkMatch[2];
        }
      }
      if (tranId !== null && qrLink !== null) {
        break;
      }
    }

    return {
      tranId: tranId as string,
      qrLink: qrLink as string
    };
  }
  /**
   *extractData
   * @param sourceString
   * @returns
   */
  extractData(sourceString: string) {
    const findValue = (key: string) => {
      const regex = new RegExp(`const ${key}\\s*=\\s*"([^"]*)"`, 's');
      const match = sourceString.match(regex);
      return match ? match[1] : null;
    };
    const tranId = findValue('tran_id') as string;
    const qrLink = findValue('qr_link') as string;
    return {
      tranId: tranId,
      qrLink: qrLink
    };
  }

}
