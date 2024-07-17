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

export const storeSchema = z.object({
  storeName: z
    .string()
    .min(1, { message: "This field is required!" })
    .max(30, { message: "Maximum 30 characters!" }),
  category: z.string().min(1, { message: "Select at least one category!" }),
  description: z
    .string()
    .min(10, { message: "At least 10 characters!" })
    .max(100, { message: "Maximum 50 characters!" }),
});

export const formattedAddress = z.object({
  formattedAddress: z.string().min(5),
});

export const categorySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(15).max(100),
});

export const serviceSchema = z.object({
  title: z
    .string({ message: "This field can contain only letters!" })
    .min(1, { message: "This field is required!" })
    .max(20),
  description: z
    .string()
    .min(1, { message: "This field is required!" })
    .max(100),
  categoryId: z.string().min(1, { message: "This field is required!" }),
  duration: z.string().min(1, { message: "This field is required!" }),
  serviceType: z.string().min(1, { message: "This field is required!" }),
  price: z
    .string({ message: "This field can contain only numbers!" })
    .min(1, { message: "This field is required!" }),
  currency: z.string().min(1, { message: "This field is required!" }),
});
