import { z } from "zod";

import { TopicDataSchema } from "./TopicData";
import { GeneralAuthorDataSchema } from "./GeneralAuthorData";

export const GeneralPostDataSchema = z.object({
  _id: z.string(),
  author: GeneralAuthorDataSchema,
  title: z.string(),
  date: z.string(),
  topic: TopicDataSchema,
  thumbnail_image: z.string().optional(),
});

export type GeneralPostData = z.infer<typeof GeneralPostDataSchema>;
