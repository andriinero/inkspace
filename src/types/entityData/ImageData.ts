import { z } from "zod";

export const ImageDataSchema = z.object({ size: z.number(), type: z.string() });

export type ImageData = z.infer<typeof ImageDataSchema>;
