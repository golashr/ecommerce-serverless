import 'source-map-support/register';
import awsSdk from 'aws-sdk';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { success, failure } from '../libs/response';
// import dynamoDb from '../libs/dynamic-lib';
import { DynamoDBClient } from '../libs/dynamicDBClient';
// const logger = require('../libs/logger');
import sku from '../models/sku';

awsSdk.config.update({ region: process.env.region });

export const main = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const initialData = JSON.parse(event.body!);
  console.log('event    ', event.requestContext.identity);
  console.log('initialData  ', initialData);
  if (!initialData) {
    return failure({ status: false });
  }
  console.log('length of data', initialData.length);
  // logger.info(`length of data ${initialData.length}`);
  const skuTableName: string = process.env.TABLE_NAME;
  const store = new DynamoDBClient();

  try {
    const skuClient = new sku(skuTableName, store);
    initialData.forEach(async (data: tSku) => {
      await skuClient.create(data);
    });
    return success('<h1>The list of SKUs are retrieved by ECommerce service.</h1>', initialData);
  } catch (err) {
    // logger.error(`error in putting sku in SkuTable ${skuTableName} ${err}`);
    return failure({ status: false, message: `${err}` });
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
