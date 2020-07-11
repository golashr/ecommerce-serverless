"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
require("source-map-support/register");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const response_1 = require("../libs/response");
// import dynamoDb from '../libs/dynamic-lib';
const dynamicDBClient_1 = require("../libs/dynamicDBClient");
// const logger = require('../libs/logger');
const sku_1 = __importDefault(require("../models/sku"));
aws_sdk_1.default.config.update({ region: process.env.region });
exports.main = async (event) => {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const initialData = JSON.parse(event.body);
    console.log('event    ', event.requestContext.identity);
    console.log('initialData  ', initialData);
    if (!initialData) {
        return response_1.failure({ status: false });
    }
    console.log('length of data', initialData.length);
    // logger.info(`length of data ${initialData.length}`);
    const skuTableName = process.env.TABLE_NAME;
    const store = new dynamicDBClient_1.DynamoDBClient();
    try {
        const skuClient = new sku_1.default(skuTableName, store);
        initialData.forEach(async (data) => {
            await skuClient.create(data);
        });
        return response_1.success(initialData);
    }
    catch (err) {
        // logger.error(`error in putting sku in SkuTable ${skuTableName} ${err}`);
        return response_1.failure({ status: false, message: `${err}` });
    }
    // initialData.forEach(async (data) => {
    //   const params = {
    //     TableName: skuTableName,
    //     Item: {
    //       sku: data.sku,
    //       name: data.name,
    //       price: data.price,
    //       img: data.img,
    //       createdAt: Date.now(),
    //     },
    //     ReturnValues: 'ALL_OLD',
    //     ConditionExpression: 'attribute_not_exists(#ecommerce-serverless-dev-skus.sku)',
    //     'ExpressionAttributeNames' => array('#h' => 'hash')
    //   };
    //   try {
    //     const retVal = await dynamoDb.put(params);
    //     console.log('retVal ', retVal);
    //   } catch (error) {
    //     console.log(error);
    //     return failure({ status: false });
    //   }
    // });
    // return success(initialData);
};
//# sourceMappingURL=initskus.js.map