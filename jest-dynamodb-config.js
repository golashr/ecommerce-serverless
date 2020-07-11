module.exports = {
  tables: [
    {
      TableName: `SkuTable`,
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'sku',
          AttributeType: 'S',
        },
        {
          AttributeName: 'name',
          AttributeType: 'S',
        },
        {
          AttributeName: 'price',
          AttributeType: 'S',
        },
        {
          AttributeName: 'img',
          AttributeType: 'S',
        },
        {
          AttributeName: 'createdAt',
          AttributeType: 'S',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'createdAt-Index',
          KeySchema: [
            {
              AttributeName: 'createdAt',
              KeyType: 'HASH',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      ],
    },
  ],
};
