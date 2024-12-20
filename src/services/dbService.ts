import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
});

export const saveData = async (item: Record<string, any>): Promise<void> => {
  const params = {
    TableName: process.env.DYNAMO_TABLE || "",
    Item: item,
  };
  await dynamoDB.put(params).promise();
};

export const getData = async (): Promise<any[]> => {
  const params = {
    TableName: process.env.DYNAMO_TABLE || "",
  };
  const result = await dynamoDB.scan(params).promise();
  return result.Items || [];
};
