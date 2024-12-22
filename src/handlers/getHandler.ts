import { APIGatewayProxyResult } from "aws-lambda";
import { getData } from "../services/dbService";
import { fetchStarWarsData } from "../services/swapiService";
import { log, errorLog } from "../utils/logger";
import { StarWarsPerson } from "../models/interfaces";

const fetchPeopleData = async (): Promise<StarWarsPerson[]> => {
  try {
    const response = await fetchStarWarsData("people");
    return response.results.slice(0, 5);
  } catch (error: any) {
    console.error("SWAPI Error:", error.message);
    return [];
  }
};

export const handleGetRequest = async (): Promise<APIGatewayProxyResult> => {
  try {
    const dbData = await getData();
    const swapiData = await fetchPeopleData();

    log("Fetched data", { dbData, swapiData });
    return {
      statusCode: 200,
      body: JSON.stringify({
        dbData,
        swapiData,
      }),
    };
  } catch (error: any) {
    errorLog("Error in GET handler:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching data" }),
    };
  }
};
