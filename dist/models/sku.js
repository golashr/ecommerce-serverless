"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sku {
    constructor(tableName, store) {
        this.tableName = tableName;
        this.store = store;
    }
    async create(sku) {
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
    async findRecordBySku(sku) {
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
        const record = await this.store.query(params).then((result) => result.Items[0]);
        return record;
    }
    async updatePrice(sku, price) {
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
}
exports.default = Sku;
//# sourceMappingURL=sku.js.map