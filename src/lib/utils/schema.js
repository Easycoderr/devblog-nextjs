import { z } from "zod";
// Define acceptable file types and maximum size (4MB)
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 Megabytes in bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const postFormSchema = z.object({
  title: z
    .string()
    .min(4, "Title should be string and must be at least 4 characters."),
  // .max(30, "Title must be less than 30 characters."),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters.")
    .max(300, "Description must be less than 300 characters."),
  content: z.string().min(500, "content must be at least 500+ characters."),
  category: z.string().min(1, "Category is required"),
  image: z
    .any()
    .refine(
      (file) => !file || file.length === 0 || file[0]?.size <= MAX_FILE_SIZE,
      "Max image size is 4MB.",
    )
    .refine(
      (file) =>
        !file ||
        file.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

// register form validation
export const registerSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters."),
  lastName: z.string().min(2, "Last Name must be at least 2 characters."),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not mutch.",
      path: ["confirmPassword"],
    }),
  profilePicture: z
    .any()
    .refine(
      (file) => !file || file.length === 0 || file[0]?.size <= MAX_FILE_SIZE,
      "Max image size is 4MB.",
    )
    .refine(
      (file) =>
        !file ||
        file.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

// sign form validation
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
