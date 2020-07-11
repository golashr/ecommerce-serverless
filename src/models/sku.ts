// const { uuid } = require('uuidv4');
// const logger = require('../libs/logger');
import { DynamoDB } from 'aws-sdk';
import { DynamoDBClient } from '../libs/dynamicDBClient';

export default class Sku {
  private store: DynamoDBClient;
  private tableName: DynamoDB.DocumentClient.TableName;

  constructor(tableName: DynamoDB.DocumentClient.TableName, store: DynamoDBClient) {
    this.tableName = tableName;
    this.store = store;
  }

  async create(sku: tSku) {
    // logger.info(`Sku ${Sku.sku}`);
    const item = {
      sku: sku.sku,
      name: sku.name,
      price: sku.price,
      img: sku.img,
      createdAt: Date.now(),
    };
    const params = {
      TableName: this.tableName,
      Item: item,
    };
    return this.store.create(params);
  }

  async findRecordBySku(sku: string) {
    const params = {
      TableName: this.tableName,
      //   IndexName: 'Sku-index',
      KeyConditionExpression: '#t = :t',
      ExpressionAttributeNames: {
        '#t': 'sku',
      },
      ExpressionAttributeValues: {
        ':t': sku,
      },
    };

    const record = await this.store.query(params).then((result: any) => result.Items[0]);
    return record;
  }

  async updatePrice(sku: string, price: number) {
    const params = {
      TableName: this.tableName,
      Key: { sku },
      UpdateExpression: 'SET #price = :price',
      ExpressionAttributeNames: {
        '#price': 'price',
      },
      ExpressionAttributeValues: {
        ':price': price,
      },
      ReturnValues: 'ALL_NEW',
    };
    await this.store.update(params);
  }

  //   async findRecordsByAccountId(accountId) {
  //     logger.info(`accountId ${accountId}`);
  //     const params = {
  //       TableName: this.tableName,
  //       IndexName: 'accountId-index',
  //       KeyConditionExpression: '#t = :t',
  //       ExpressionAttributeNames: {
  //         '#t': 'accountId',
  //       },
  //       ExpressionAttributeValues: {
  //         ':t': accountId,
  //       },
  //     };

  //     const records = await this.store.query(params).then((result) => result.Items);
  //     return records;
  //   }
}
