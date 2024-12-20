export const validateInput = (data: Record<string, any>): void => {
  const requiredFields = ["name", "height", "mass"];
  const missingFields = requiredFields.filter(field => !data[field]);
  if (missingFields.length) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }
};
