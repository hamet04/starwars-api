import { StarWarsPerson } from "./interfaces";

const translations: Record<keyof StarWarsPerson, string> = {
  name: "nombre",
  height: "altura",
  mass: "masa",
};

/**
 * Translates a StarWarsPerson object from English to Spanish.
 * @param data The StarWarsPerson object to be translated.
 * @returns A translated StarWarsPerson object.
 */
const translate = (data: Partial<StarWarsPerson>): Record<string, unknown> => {
  const translated: Record<string, unknown> = {};
  Object.keys(data).forEach((key) => {
    const translatedKey = translations[key as keyof StarWarsPerson] || key;
    translated[translatedKey] = data[key as keyof StarWarsPerson];
  });
  return translated;
};

export default translate;
