export interface ValidationResult {
  address: {
    formattedAddress: string;
  };
  // Add other properties as needed
}

export async function validateAddress(
  address: string,
  country: string,
  locality: string,
  administativeArea: string,
  postalCode: string
): Promise<ValidationResult | null> {
  try {
    const response = await fetch("/api/validate-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        region: country,
        locality,
        administativeArea,
        postalCode,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to validate address");
    }

    const result: ValidationResult = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
}
