export const log = (message: string, data: Record<string, unknown>): void => {
  console.log(`[INFO] ${message}:`, JSON.stringify(data, null, 2));
};

export const errorLog = (message: string, error: unknown): void => {
  console.error(`[ERROR] ${message}:`, error);
};
