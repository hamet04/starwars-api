import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { saveData } from "../services/dbService";
import translate from "../models/translations";
import { validateInput } from "../utils/validateInput";
import { log, errorLog } from "../utils/logger";
import { v4 as uuidv4 } from "uuid";
import { StarWarsPerson } from "../models/interfaces";

export const handlePostRequest = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {  
  try {
    const body: StarWarsPerson = JSON.parse(event.body || "{}");
    validateInput(body);
    const translatedData = translate(body);
    const item = { id: uuidv4(), ...translatedData };
    await saveData(item);

    log("Data saved", item);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Data saved successfully", data: item }),
    };
  } catch (error: any) {
    errorLog("POST handler:", error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
