/**
 * @EnnquiryPayment
 * @EnnquiryPayment
 * @EnnquiryPayment
 */
interface EnquiryRequest {
    merchOrderId: string;
}
interface EnquiryDecodedResponse {
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
interface PaymentRequest {
    merchOrderId: string;
    amount: string;
    appKey: string;
    timestamp: string;
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
    checkSum: string;
}
interface PaymentResponse {
    success: boolean;
    transactionId: string;
    qrCodeUrl: string;
    redirectUrl: string;
    error?: string;
}
/**
 * @PaymentLists
 * @PaymentLists
 * @PaymentLists
 */
interface PaymentServiceResponse {
    name: string;
    key: string;
    image_url: string;
    methods: 'WEB' | 'QR' | 'NOTI'[];
}
/**
 * @Callbacks
 * @Callbacks
 * @Callbacks
 */
interface CallbackRequest {
    payload: string;
    merchOrderId: string;
    checkSum: string;
}
/**
 * SDKOptions
 */
export interface SDKOptions {
    baseUrl: string;
    appKey: string;
    secretKey: string;
}
/**
 * AYAMerchantSDK
 * @param {SDKOptions} options
 * @returns {AYAMerchant} A status message string.
 */
export declare function AYAMerchantSDK(options: SDKOptions): AYAMerchant;
/**
 * @AYAMerchant
 */
export default class AYAMerchant {
    #private;
    constructor(options: SDKOptions);
    /**
     * loadMethods
     * @returns {PaymentServiceResponse[]}
     */
    loadMethods(): Promise<PaymentServiceResponse[]>;
    /**
     * createPayment
     * @param {PaymentRequest} payload
     * @param {string} payload.merchOrderId
     * @param {string} payload.amount
     * @param {string} payload.appKey
     * @param {number} payload.timestamp
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
    createPayment(payload: PaymentRequest): Promise<PaymentResponse>;
    /**
     * enquiryPayment
     * @param {EnquiryRequest} payload
     * @param {string} payload.merchOrderId
     * @returns {EnquiryDecodedResponse}
     */
    enquiryPayment(payload: EnquiryRequest): Promise<EnquiryDecodedResponse>;
    /**
     * verifyCallback
     * @param {CallbackRequest} options
     * @param {string} options.payload
     * @param {string} options.merchOrderId
     * @param {string} options.checkSum
     * @returns {CallbackDecodedRespoonse}
     */
    verifyCallback(options: CallbackRequest): Promise<boolean>;
    /**
     * sumCheckLoadMethods
     * @param {string} nonce
     * @returns {string}
     */
    sumCheckLoadMethods(nonce: string): string;
    /**
     * sumCheckPayRequest
     * @param {string} merchOrderId
     * @param {string} amount
     * @param {string} appKey
     * @param {string} timestamp
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
    sumCheckPayRequest(merchOrderId: string, amount: string, appKey: string, timestamp: string, userRef1: string, userRef2: string, userRef3: string, userRef4: string, userRef5: string, description: string, currencyCode: string, channel: string, method: string, overrideFrontendRedirectUrl: string): string;
    /**
     * sumCheckEnquiry
     * @param {string} merchOrderId
     * @param {string} nonce
     * @returns {string}
     */
    sumCheckEnquiry(merchOrderId: string, nonce: string): string;
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
    sumCheckCallback(merchOrderId: string, tranId: string, amount: string, currencyCode: string, statusCode: string, paymentCardNumber: string, paymentMobileNumber: string, cardTypeName: string, cardExpiryDate: string, nameOnCard: string, approvalCode: string, tranRef: string, userRef1: string, userRef2: string, userRef3: string, userRef4: string, userRef5: string, description: string, dateTime: string): string;
}
export {};
