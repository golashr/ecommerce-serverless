"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBClient = void 0;
const aws_sdk_1 = require("aws-sdk");
/**
 * AWS DynamoDB Client
 *
 * @export
 * @class DynamoDBClient
 */
class DynamoDBClient {
    constructor() {
        this.client = new aws_sdk_1.DynamoDB.DocumentClient();
    }
    /**
     * Create a record
     *
     * @param {DynamoDB.DocumentClient.PutItemInput} params
     * @returns
     * @memberof DynamoDBClient
     */
    create(params) {
        return this.client.put(params).promise();
    }
    /**
     * Get a record
     *
     * @param {DynamoDB.DocumentClient.GetItemInput} params
     * @returns
     * @memberof DynamoDBClient
     */
    get(params) {
        return this.client.get(params).promise();
    }
    /**
     * Query an index
     *
     * @param {DynamoDB.DocumentClient.QueryInput} params
     * @returns
     * @memberof DynamoDBClient
     */
    query(params) {
        return this.client.query(params).promise();
    }
    /**
     * Update a record
     *
     * @param {DynamoDB.DocumentClient.UpdateItemInput} params
     * @returns
     * @memberof DynamoDBClient
     */
    update(params) {
        return this.client.update(params).promise();
    }
    /**
     * Scan table
     *
     * @param {DynamoDB.DocumentClient.TableName} tableName
     * @returns
     * @memberof DynamoDBClient
     */
    async scan(tableName) {
        const params = {
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
    delete(tableName, item) {
        const params = {
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
    async clear(tableName) {
        const items = await this.scan(tableName);
        const promises = items === null || items === void 0 ? void 0 : items.map(item => this.delete(tableName, item));
        return Promise.all(promises);
    }
}
exports.DynamoDBClient = DynamoDBClient;
//# sourceMappingURL=dynamicDBClient.js.map