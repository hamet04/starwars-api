import axios from "axios";
import { SwapiResponse } from "../models/interfaces";

export const fetchStarWarsData = async (endpoint: string): Promise<SwapiResponse> => {
  try {
    const url = `https://swapi.py4e.com/api/${endpoint}`;
    const response = await axios.get<SwapiResponse>(url, { timeout: 5000 });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`SWAPI request failed: ${error.message}`);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
