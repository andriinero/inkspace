import { z } from 'zod';

const MAX_FILE_SIZE = 2097152;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png'];

export const ProfileImageSchema = z.object({
  image: z
    .any()
    .refine((fileList) => fileList[0].size <= MAX_FILE_SIZE, 'Max image size is 2MB')
    .refine((fileList) => {
      return ACCEPTED_FILE_TYPES.includes(fileList[0].type);
    }, 'Only .jpeg, .png formats are supported'),
});

export type TProfileImageSchema = z.infer<typeof ProfileImageSchema>;
