import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});
``;
export const storeSchema = z.object({
  storeName: z
    .string()
    .min(1, { message: "This field is required!" })
    .max(15, { message: "Maximum 15 characters!" }),
  category: z.string().min(1, { message: "Select at least one category!" }),
  description: z
    .string()
    .min(10, { message: "At least 10 characters!" })
    .max(50, { message: "Maximum 50 characters!" }),
});

export const storeAddress = z.object({
  country: z.string().min(1, { message: "Select a country!" }),
  streetAddress: z.string().min(1, { message: "This field is required!" }),
  state: z.string().min(1, { message: "This field is required!" }),
  city: z.string().min(1, { message: "This field is required!" }),
  zipCode: z.string().min(4, { message: "Invalid postalCode" }),
});

export const formattedAddress = z.object({
  formattedAddress: z.string().min(5),
});
