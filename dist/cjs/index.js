"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _AYAMerchantClass_baseUrl, _AYAMerchantClass_appKey, _AYAMerchantClass_secretKey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AYAMerchantSDK = AYAMerchantSDK;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * @AYAMerchantSDK
 * @AYAMerchantSDK
 * @AYAMerchantSDK
 * @param {SDKOptions} options
 * @returns {AYAMerchantClass} A status message string.
 */
function AYAMerchantSDK(options) {
    return new AYAMerchantClass({
        baseUrl: options.baseUrl,
        appKey: options.appKey,
        secretKey: options.secretKey,
    });
}
/**
 * @AYAMerchantClass
 * @AYAMerchantClass
 * @AYAMerchantClass
 */
class AYAMerchantClass {
    constructor(options) {
        _AYAMerchantClass_baseUrl.set(this, void 0);
        _AYAMerchantClass_appKey.set(this, void 0);
        _AYAMerchantClass_secretKey.set(this, void 0);
        __classPrivateFieldSet(this, _AYAMerchantClass_baseUrl, options.baseUrl, "f");
        __classPrivateFieldSet(this, _AYAMerchantClass_appKey, options.appKey, "f");
        __classPrivateFieldSet(this, _AYAMerchantClass_secretKey, options.secretKey, "f");
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
                appKey: __classPrivateFieldGet(this, _AYAMerchantClass_appKey, "f"),
                timestamp: timestamp,
                checkSum: signature
            };
            const response = await axios_1.default.post(`${__classPrivateFieldGet(this, _AYAMerchantClass_baseUrl, "f")}/v1/payment/services`, body, config);
            return response.data;
        }
        catch (error) {
            console.error(error);
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
    async createPayment(payload) {
        try {
            const timestamp = new Date().getTime();
            const signature = this.sumCheckPayRequest(payload.merchOrderId, payload.amount, timestamp, payload.userRef1, payload.userRef2, payload.userRef3, payload.userRef4, payload.userRef5, payload.description, payload.currencyCode, payload.channel, payload.method, payload.overrideFrontendRedirectUrl);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const body = {
                merchOrderId: payload.merchOrderId,
                amount: payload.amount,
                appKey: __classPrivateFieldGet(this, _AYAMerchantClass_appKey, "f"),
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
            };
            const response = await axios_1.default.post(`${__classPrivateFieldGet(this, _AYAMerchantClass_baseUrl, "f")}/v1/payment/request`, body, config);
            const extracted = this.extractDataByValuePattern(response.data);
            return {
                success: true,
                qr: extracted.qrLink,
                transactionId: extracted.tranId,
            };
        }
        catch (error) {
            console.error(error);
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
    async createPaymentRedirect(payload) {
        try {
            const timestamp = new Date().getTime();
            const signature = this.sumCheckPayRequest(payload.merchOrderId, payload.amount, timestamp, payload.userRef1, payload.userRef2, payload.userRef3, payload.userRef4, payload.userRef5, payload.description, payload.currencyCode, payload.channel, payload.method, payload.overrideFrontendRedirectUrl);
            const body = {
                merchOrderId: payload.merchOrderId,
                amount: payload.amount,
                appKey: __classPrivateFieldGet(this, _AYAMerchantClass_appKey, "f"),
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
            };
            return body;
        }
        catch (error) {
            console.error(error);
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
                appKey: __classPrivateFieldGet(this, _AYAMerchantClass_appKey, "f"),
                timestamp: timestamp,
                checkSum: signature
            };
            const response = await axios_1.default.post(`${__classPrivateFieldGet(this, _AYAMerchantClass_baseUrl, "f")}/v1/payment/enquiry`, body, config);
            const enquiryResponse = response.data;
            const jsonString = Buffer.from(enquiryResponse.data.payload, 'base64').toString('utf-8');
            const jsonObject = JSON.parse(jsonString);
            return jsonObject;
        }
        catch (error) {
            console.error(error);
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
        const stringToSign = `${__classPrivateFieldGet(this, _AYAMerchantClass_appKey, "f")}:${__classPrivateFieldGet(this, _AYAMerchantClass_secretKey, "f")}:${nonce}`;
        return crypto_1.default.createHmac('sha256', __classPrivateFieldGet(this, _AYAMerchantClass_secretKey, "f"))
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
    sumCheckPayRequest(merchOrderId, amount, timestamp, userRef1, userRef2, userRef3, userRef4, userRef5, description, currencyCode, channel, method, overrideFrontendRedirectUrl) {
        const stringToSign = [
            merchOrderId,
            amount,
            __classPrivateFieldGet(this, _AYAMerchantClass_appKey, "f"),
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
        return crypto_1.default.createHmac('sha256', __classPrivateFieldGet(this, _AYAMerchantClass_secretKey, "f"))
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
        const stringToSign = `${merchOrderId}:${nonce}:${__classPrivateFieldGet(this, _AYAMerchantClass_appKey, "f")}`;
        return crypto_1.default.createHmac('sha256', __classPrivateFieldGet(this, _AYAMerchantClass_secretKey, "f"))
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
        return crypto_1.default.createHmac('sha256', __classPrivateFieldGet(this, _AYAMerchantClass_secretKey, "f"))
            .update(stringToSign)
            .digest('hex');
    }
    /**
     * extractDataByValuePattern
     * @param {string} sourceString The raw HTML or content string to parse.
     * @returns An object containing the extracted values.
     */
    extractDataByValuePattern(sourceString) {
        const scriptTagRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
        const tranIdRegex = /([A-Za-z]\d{5,30})/g;
        const qrLinkRegex = /(['"])\s*000201\s*(.*?com\.mmqrpay.*?)\s*\1/s;
        let tranId = null;
        let qrLink = null;
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
            tranId: tranId,
            qrLink: qrLink
        };
    }
    /**
     *extractData
     * @param sourceString
     * @returns
     */
    extractData(sourceString) {
        const findValue = (key) => {
            const regex = new RegExp(`const ${key}\\s*=\\s*"([^"]*)"`, 's');
            const match = sourceString.match(regex);
            return match ? match[1] : null;
        };
        const tranId = findValue('tran_id');
        const qrLink = findValue('qr_link');
        return {
            tranId: tranId,
            qrLink: qrLink
        };
    }
}
_AYAMerchantClass_baseUrl = new WeakMap(), _AYAMerchantClass_appKey = new WeakMap(), _AYAMerchantClass_secretKey = new WeakMap();
