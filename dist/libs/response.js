"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
const http_status_1 = require("../constants/http-status");
/**
 * Successful response
 * @param {*} data
 */
function success(body) {
    return buildResponse(http_status_1.httpStatus.HTTP_200, body);
}
exports.success = success;
/**
 * Failed response
 * @param {*} error
 */
function failure(body) {
    return buildResponse(http_status_1.httpStatus.HTTP_500, body);
}
exports.failure = failure;
/**
 * Build response
 * @param {number} statusCode
 * @param {*} body
 */
function buildResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(body),
    };
}
//# sourceMappingURL=response.js.map