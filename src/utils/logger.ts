export const log = (message: string, data: any): void => {
  console.log(`${message}:`, JSON.stringify(data, null, 2));
};
