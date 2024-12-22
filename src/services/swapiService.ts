import axios from "axios";
import { SwapiResponse } from "../models/interfaces";
import { errorLog } from "../utils/logger";

export const fetchStarWarsData = async (endpoint: string): Promise<SwapiResponse> => {
  try {
    const url = `${process.env.SWAPI_BASE_URL}/${endpoint}`;
    const response = await axios.get<SwapiResponse>(url, { timeout: 5000 });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      errorLog("SWAPI Axios", error.message);
      throw new Error(`SWAPI request failed: ${error.message}`);
    } else {
      errorLog("Unexpected SWAPI", error);
      throw new Error("Unexpected error occurred");
    }
  }
};
