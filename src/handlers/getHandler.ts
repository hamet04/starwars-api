import { APIGatewayProxyResult } from "aws-lambda";
import { getData } from "../services/dbService";
import { fetchStarWarsData } from "../services/swapiService";
import { log } from "../utils/logger";
import { StarWarsPerson } from "../models/interfaces";

export const main = async (): Promise<APIGatewayProxyResult> => {
  try {
    const dbData = await getData();
    let swapiData: StarWarsPerson[] = [];
    try {
      const response = await fetchStarWarsData("people");
      swapiData = response.results.slice(0, 5);
    } catch (error) {
      console.error("SWAPI Error:", error.message);
    }

    log("Fetched data", { dbData, swapiData });
    return {
      statusCode: 200,
      body: JSON.stringify({
        dbData,
        swapiData,
      }),
    };
  } catch (error: any) {
    console.error("Error in GET handler:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching data" }),
    };
  }
};
