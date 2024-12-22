import { handlePostRequest } from "../handlers/postHandler";
import { saveData } from "../services/dbService";
import { validateInput } from "../utils/validateInput";
import { v4 as uuidv4 } from "uuid";

jest.mock("../services/dbService");
jest.mock("../utils/validateInput");
jest.mock("uuid", () => ({ v4: jest.fn() }));

describe("handlePostRequest", () => {
  it("should save valid data", async () => {
    (uuidv4 as jest.Mock).mockReturnValue("1234");
    (saveData as jest.Mock).mockResolvedValue(undefined);

    const mockEvent = {
      body: JSON.stringify({ name: "Luke Skywalker", height: "172", mass: "77" }),
    };

    const result = await handlePostRequest(mockEvent as any);

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual({
      message: "Data saved successfully",
      data: { id: "1234", name: "Luke Skywalker", height: "172", mass: "77" },
    });
  });

  it("should return an error for invalid input", async () => {
    (validateInput as jest.Mock).mockImplementation(() => {
      throw new Error("Missing required fields: height");
    });

    const mockEvent = { body: JSON.stringify({ name: "Luke Skywalker" }) };

    const result = await handlePostRequest(mockEvent as any);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({ message: "Missing required fields: height" });
  });
});