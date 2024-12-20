const translations: Record<string, string> = {
  name: "nombre",
  height: "altura",
  mass: "masa",
};

const translate = (data: Record<string, any>): Record<string, any> => {
  const translated: Record<string, any> = {};
  Object.keys(data).forEach((key) => {
    translated[translations[key] || key] = data[key];
  });
  return translated;
};

export default translate;
