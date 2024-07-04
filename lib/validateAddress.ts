import axios from "axios";

export const validateAddress = async (
  address: string,
  region: string,
  locality: string,
  administrativeArea: string
) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const endpoint = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${apiKey}`;

  const requestBody = {
    address: {
      administrativeArea: administrativeArea,
      locality: locality,
      regionCode: region,
      addressLines: [address],
    },
  };

  try {
    const response = await axios.post(endpoint, requestBody);
    if (response.status !== 200) {
      throw new Error(`Error validating address: ${response.statusText}`);
    }

    const result = response.data.result;
    const validatedAddress = result.address.formattedAddress;

    return {
      response: response.data,
      formattedAddress: validatedAddress,
    };
  } catch (error) {
    console.error("Error validating address:", error);
    throw new Error("Failed to validate address");
  }
};
