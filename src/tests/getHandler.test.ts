import { main as getHandler } from "../handlers/getHandler";
import { fetchStarWarsData } from "../services/swapiService";

jest.mock("../services/swapiService", () => ({
  fetchStarWarsData: jest.fn(() =>
    Promise.resolve({
      results: [
        { name: "Luke", height: "172", mass: "77" },
        { name: "Leia", height: "150", mass: "49" },
      ],
    })
  ),
}));

test("GET handler fetches data", async () => {
  const response = await getHandler();
  expect(response.statusCode).toBe(200);
  const body = JSON.parse(response.body);
  expect(body.dbData).toBeDefined();
  expect(body.swapiData).toHaveLength(2);
});
