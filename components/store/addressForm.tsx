"use client";
import { useState, FormEvent } from "react";
import EmbeddedMap from "./embed-map";
import { Input } from "../ui/input";
import {
  SelectItem,
  Select,
  SelectLabel,
  SelectTrigger,
  SelectGroup,
  SelectContent,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface ValidationResult {
  // Define the shape of the validation result here
  address: {
    formattedAddress: string;
  };
  // Add other properties as needed
}

const AddressForm = () => {
  const [address, setAddress] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/validate-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, region: country }),
      });

      const result: ValidationResult = await response.json();
      setValidationResult(result);
      setError(null);
    } catch (err) {
      setError("Failed to validate address");
      setValidationResult(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex space-x-2 items-center justify-center">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select the country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="AR">🇦🇷 Argentina</SelectItem>
                <SelectItem value="AU">🇦🇺 Australia</SelectItem>
                <SelectItem value="AT">🇦🇹 Austria</SelectItem>
                <SelectItem value="BE">🇧🇪 Belgium</SelectItem>
                <SelectItem value="BR">🇧🇷 Brazil</SelectItem>
                <SelectItem value="BG">🇧🇬 Bulgaria</SelectItem>
                <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                <SelectItem value="CL">🇨🇱 Chile</SelectItem>
                <SelectItem value="CO">🇨🇴 Colombia</SelectItem>
                <SelectItem value="HR">🇭🇷 Croatia</SelectItem>
                <SelectItem value="CZ">🇨🇿 Czechia</SelectItem>
                <SelectItem value="DK">🇩🇰 Denmark</SelectItem>
                <SelectItem value="EE">🇪🇪 Estonia</SelectItem>
                <SelectItem value="FI">🇫🇮 Finland</SelectItem>
                <SelectItem value="FR">🇫🇷 France</SelectItem>
                <SelectItem value="DE">🇩🇪 Germany</SelectItem>
                <SelectItem value="HU">🇭🇺 Hungary</SelectItem>
                <SelectItem value="IE">🇮🇪 Ireland</SelectItem>
                <SelectItem value="IT">🇮🇹 Italy</SelectItem>
                <SelectItem value="LV">🇱🇻 Latvia</SelectItem>
                <SelectItem value="LT">🇱🇹 Lithuania</SelectItem>
                <SelectItem value="LU">🇱🇺 Luxembourg</SelectItem>
                <SelectItem value="MY">🇲🇾 Malaysia</SelectItem>
                <SelectItem value="MX">🇲🇽 Mexico</SelectItem>
                <SelectItem value="NL">🇳🇱 Netherlands</SelectItem>
                <SelectItem value="NO">🇳🇴 Norway</SelectItem>
                <SelectItem value="NZ">🇳🇿 New Zealand</SelectItem>
                <SelectItem value="PL">🇵🇱 Poland</SelectItem>
                <SelectItem value="PT">🇵🇹 Portugal</SelectItem>
                <SelectItem value="PR">🇵🇷 Puerto Rico</SelectItem>
                <SelectItem value="SG">🇸🇬 Singapore</SelectItem>
                <SelectItem value="SK">🇸🇰 Slovakia</SelectItem>
                <SelectItem value="SI">🇸🇮 Slovenia</SelectItem>
                <SelectItem value="ES">🇪🇸 Spain</SelectItem>
                <SelectItem value="SE">🇸🇪 Sweden</SelectItem>
                <SelectItem value="CH">🇨🇭 Switzerland</SelectItem>
                <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
                <SelectItem value="US">🇺🇸 United States</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            className="w-full"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State / Province"
          />
        </div>
        <div className="flex space-x-2 items-center justify-center">
          <Input
            className="w-full"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
          <Input
            className="w-full"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </div>
        <div className="flex space-x-2 items-center">
          <Input className="w-[50%]" placeholder="ZIP Code" />
        </div>
      </form>

      <div className="mt- mb-2">
        <EmbeddedMap
          width="100%"
          height="250px"
          address={JSON.stringify(validationResult)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddressForm;
