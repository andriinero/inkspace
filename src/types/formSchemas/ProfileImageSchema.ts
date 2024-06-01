import { z } from 'zod';

const MAX_FILE_SIZE = 2097152;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png'];

export const imageValidator = z
  .custom<FileList>()
  .superRefine((fileList, ctx) => {
    if (!fileList || fileList.length === 0)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Upload field must not be empty',
        fatal: true,
      });
  })
  .transform((fileList) => fileList.length > 0 && fileList.item(0))
  .refine((file) => !file || (!!file && file.size <= MAX_FILE_SIZE), {
    message: 'Max image size is 2MB',
  })
  .refine(
    (file) => !file || (!!file && ACCEPTED_FILE_TYPES.includes(file.type)),
    {
      message: 'Only .jpeg, .png formats are supported',
    },
  );

export const ImageSchema = z.object({
  image: imageValidator,
});

export type TImageSchema = z.infer<typeof ImageSchema>;
