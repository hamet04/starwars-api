import AWS from "aws-sdk";
import { errorLog } from "../utils/logger";

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
});

const getTableName = (): string => {
  if (!process.env.DYNAMO_TABLE) {
    throw new Error("Environment variable DYNAMO_TABLE is not set");
  }
  return process.env.DYNAMO_TABLE;
};

export const saveData = async (item: Record<string, any>): Promise<void> => {
  try {
    const params = {
      TableName: getTableName(),
      Item: item,
    };
    await dynamoDB.put(params).promise();
  } catch (error) {
    errorLog("Saving data to DynamoDB:", error);
    throw new Error("Failed to save data");
  }
};

export const getData = async <T>(): Promise<T[]> => {
  try {
    const params = {
      TableName: getTableName(),
    };
    const result = await dynamoDB.scan(params).promise();
    return (result.Items || []) as T[];
  } catch (error) {
    errorLog("Fetching data from DynamoDB:", error);
    throw new Error("Failed to fetch data");
  }
};
