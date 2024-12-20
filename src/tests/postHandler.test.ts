import { main as postHandler } from "../handlers/postHandler";

jest.mock("../services/dbService", () => ({
  saveData: jest.fn(() => Promise.resolve()),
}));

test("POST handler saves data successfully", async () => {
  const event = { body: JSON.stringify({ name: "Luke", height: "172", mass: "77" }) } as any;
  const response = await postHandler(event);
  expect(response.statusCode).toBe(201);
});

test("POST handler fails when invalid JSON is provided", async () => {
  const event = { body: "{ invalid JSON" } as any;
  const response = await postHandler(event);
  expect(response.statusCode).toBe(400);
  expect(JSON.parse(response.body).message).toContain("Unexpected token");
});
