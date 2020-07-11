import { httpStatus } from '../constants/http-status';
/**
 * Successful response
 * @param {*} data
 */
export function success(message: string, data: object) {
  const body = {
    success: true,
    timestamp: Date.now(),
    message,
    data,
  };
  return buildResponse(httpStatus.HTTP_200, body);
}

/**
 * Failed response
 * @param {*} error
 */
export function failure(body: any) {
  return buildResponse(httpStatus.HTTP_500, body);
}

/**
 * Build response
 * @param {number} statusCode
 * @param {*} body
 */
function buildResponse(statusCode: httpStatus, body: any) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}
