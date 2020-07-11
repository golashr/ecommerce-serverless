import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
/**
 * AWS DynamoDB Client
 *
 * @export
 * @class DynamoDBClient
 */
export class DynamoDBClient {
  private client: DocumentClient;
  constructor() {
    this.client = new DynamoDB.DocumentClient();
  }
  /**
   * Create a record
   *
   * @param {DynamoDB.DocumentClient.PutItemInput} params
   * @returns
   * @memberof DynamoDBClient
   */
  create(params: DynamoDB.DocumentClient.PutItemInput) {
    return this.client.put(params).promise();
  }
  /**
   * Get a record
   *
   * @param {DynamoDB.DocumentClient.GetItemInput} params
   * @returns
   * @memberof DynamoDBClient
   */
  get(params: DynamoDB.DocumentClient.GetItemInput) {
    return this.client.get(params).promise();
  }
  /**
   * Query an index
   *
   * @param {DynamoDB.DocumentClient.QueryInput} params
   * @returns
   * @memberof DynamoDBClient
   */
  query(params: DynamoDB.DocumentClient.QueryInput) {
    return this.client.query(params).promise();
  }
  /**
   * Update a record
   *
   * @param {DynamoDB.DocumentClient.UpdateItemInput} params
   * @returns
   * @memberof DynamoDBClient
   */
  update(params: DynamoDB.DocumentClient.UpdateItemInput) {
    return this.client.update(params).promise();
  }
  /**
   * Scan table
   *
   * @param {DynamoDB.DocumentClient.TableName} tableName
   * @returns
   * @memberof DynamoDBClient
   */
  async scan(tableName: DynamoDB.DocumentClient.TableName) {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
    };

    const data = await this.client.scan(params).promise();
    return data.Items;
  }
  /**
   * Delete a record
   *
   * @param {DynamoDB.DocumentClient.TableName} tableName
   * @param {DynamoDB.DocumentClient.AttributeMap} item
   * @returns
   * @memberof DynamoDBClient
   */
  delete(tableName: DynamoDB.DocumentClient.TableName, item: DynamoDB.DocumentClient.AttributeMap) {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: tableName,
      Key: {
        id: item.id,
      },
    };
    return this.client.delete(params).promise();
  }
  /**
   * Empty a table
   *
   * @param {DynamoDB.DocumentClient.TableName} tableName
   * @returns
   * @memberof DynamoDBClient
   */
  async clear(tableName: DynamoDB.DocumentClient.TableName) {
    const items = await this.scan(tableName);
    const promises: any = items?.map(item => this.delete(tableName, item));
    return Promise.all(promises);
  }
}
