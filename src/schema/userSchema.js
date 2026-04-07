import { z } from "zod";

const userIdSchema = z.object({
  userId: z.preprocess((v) => Number(v), z.number().int().positive())
});

const userSchema = z.object( {
    username: z.string().min(3, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    avatar: z.string().url("Invalid URL").optional()
})

export { userSchema, userIdSchema };