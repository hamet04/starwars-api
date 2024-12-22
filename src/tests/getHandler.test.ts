import { handleGetRequest } from "../handlers/getHandler";
import { getData } from "../services/dbService";
import { fetchStarWarsData } from "../services/swapiService";

jest.mock("../services/dbService");
jest.mock("../services/swapiService");

describe("handleGetRequest", () => {
  it("should return data from the database and SWAPI", async () => {
    const mockDbData = [{ id: "1", name: "Luke Skywalker" }];
    const mockSwapiData = { results: [{ name: "Leia Organa" }] };

    (getData as jest.Mock).mockResolvedValue(mockDbData);
    (fetchStarWarsData as jest.Mock).mockResolvedValue(mockSwapiData);

    const result = await handleGetRequest();

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      dbData: mockDbData,
      swapiData: mockSwapiData.results.slice(0, 5),
    });
  });

  it("should handle errors gracefully", async () => {
    (getData as jest.Mock).mockRejectedValue(new Error("Database error"));

    const result = await handleGetRequest();

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({ message: "Error fetching data" });
  });
});
