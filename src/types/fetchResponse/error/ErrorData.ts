import { z } from "zod";

export const ErrorDataSchema = z.object({
  message: z.string(),
  errors: z.array(z.object({ msg: z.string() })).optional(),
});

export type ErrorData = z.infer<typeof ErrorDataSchema>;
