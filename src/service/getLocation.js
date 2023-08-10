import axios from "axios";

export const getLocation = async (lat, lng) => {
  const result = await axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
  );

  return {
    city: result.data.city,
    uf: result.data.principalSubdivision,
  };
};
