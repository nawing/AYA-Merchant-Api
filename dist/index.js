"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AYAMerchantSDK = AYAMerchantSDK;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * AYAMerchantSDK
 * @param {SDKOptions} options
 * @returns {AYAMerchant} A status message string.
 */
function AYAMerchantSDK(options) {
    return new AYAMerchant({
        baseUrl: options.baseUrl,
        appKey: options.appKey,
        secretKey: options.secretKey,
    });
}
/**
 * @AYAMerchant
 */
class AYAMerchant {
    #baseUrl;
    #appKey;
    #secretKey;
    constructor(options) {
        this.#baseUrl = options.baseUrl;
        this.#appKey = options.appKey;
        this.#secretKey = options.secretKey;
    }
    /**
     * loadMethods
     * @returns {PaymentServiceResponse[]}
     */
    async loadMethods() {
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
            };
            const response = await axios_1.default.post(`${this.#baseUrl}/v1/payment/services`, body, config);
            return response.data;
        }
        catch (error) {
            throw new Error("AYAConnect.loadMethods()");
        }
    }
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
    async createPayment(payload) {
        try {
            const signature = this.sumCheckPayRequest(payload.merchOrderId, payload.amount, payload.appKey, payload.timestamp, payload.userRef1, payload.userRef2, payload.userRef3, payload.userRef4, payload.userRef5, payload.description, payload.currencyCode, payload.channel, payload.method, payload.overrideFrontendRedirectUrl);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const body = {
                merchOrderId: payload.merchOrderId,
                amount: payload.amount,
                appKey: payload.appKey,
                timestamp: payload.timestamp,
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
            };
            const response = await axios_1.default.post(`${this.#baseUrl}/v1/payment/request`, body, config);
            return response.data;
        }
        catch (error) {
            throw new Error("AYAConnect.createPayment()");
        }
    }
    /**
     * enquiryPayment
     * @param {EnquiryRequest} payload
     * @param {string} payload.merchOrderId
     * @returns {EnquiryDecodedResponse}
     */
    async enquiryPayment(payload) {
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
            };
            const response = await axios_1.default.post(`${this.#baseUrl}/v1/payment/enquiry`, body, config);
            const enquiryResponse = response.data;
            const jsonString = Buffer.from(enquiryResponse.data.payload, 'base64').toString('utf-8');
            const jsonObject = JSON.parse(jsonString);
            return jsonObject;
        }
        catch (error) {
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
    async verifyCallback(options) {
        const { payload, merchOrderId, checkSum } = options;
        const jsonString = Buffer.from(payload, 'base64').toString('utf-8');
        const jsonObject = JSON.parse(jsonString);
        const signature = this.sumCheckCallback(jsonObject.merchOrderId, jsonObject.tranId, jsonObject.amount, jsonObject.currencyCode, jsonObject.statusCode, jsonObject.paymentCardNumber, jsonObject.paymentMobileNumber, jsonObject.cardTypeName, jsonObject.cardExpiryDate, jsonObject.nameOnCard, jsonObject.approvalCode, jsonObject.tranRef, jsonObject.userRef1, jsonObject.userRef2, jsonObject.userRef3, jsonObject.userRef4, jsonObject.userRef5, jsonObject.description, jsonObject.dateTime);
        return (signature === checkSum) ? true : false;
    }
    /**
     * sumCheckLoadMethods
     * @param {string} nonce
     * @returns {string}
     */
    sumCheckLoadMethods(nonce) {
        const stringToSign = `${this.#appKey}:${this.#secretKey}:${nonce}`;
        return crypto_1.default.createHmac('sha256', this.#secretKey)
            .update(stringToSign)
            .digest('hex');
    }
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
    sumCheckPayRequest(merchOrderId, amount, appKey, timestamp, userRef1, userRef2, userRef3, userRef4, userRef5, description, currencyCode, channel, method, overrideFrontendRedirectUrl) {
        const stringToSign = [
            merchOrderId,
            amount,
            appKey,
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
            overrideFrontendRedirectUrl,
            // checkSum
        ].join(':');
        return crypto_1.default.createHmac('sha256', this.#secretKey)
            .update(stringToSign)
            .digest('hex');
    }
    /**
     * sumCheckEnquiry
     * @param {string} merchOrderId
     * @param {string} nonce
     * @returns {string}
     */
    sumCheckEnquiry(merchOrderId, nonce) {
        const stringToSign = `${merchOrderId}:${nonce}:${this.#appKey}`;
        return crypto_1.default.createHmac('sha256', this.#secretKey)
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
    sumCheckCallback(merchOrderId, tranId, amount, currencyCode, statusCode, paymentCardNumber, paymentMobileNumber, cardTypeName, cardExpiryDate, nameOnCard, approvalCode, tranRef, userRef1, userRef2, userRef3, userRef4, userRef5, description, dateTime) {
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
        return crypto_1.default.createHmac('sha256', this.#secretKey)
            .update(stringToSign)
            .digest('hex');
    }
}
exports.default = AYAMerchant;
